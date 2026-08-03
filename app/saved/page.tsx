"use client";

import { useEffect, useMemo, useState } from "react";
import { getWordBySavedAt } from "../words";

type SavedWord = {
  word: string;
  pronunciation: string;
  meaning: string;
  description: string;
  example: string;
  translation: string;
  savedAt: string;
};

function readSavedWords(): SavedWord[] {
  try {
    const stored = localStorage.getItem("daily-word:saved-words");
    const words: SavedWord[] = stored ? JSON.parse(stored) : [];
    const latestWords = words.map((item) => {
      const latest = getWordBySavedAt(item.savedAt);
      return latest ? { ...latest, savedAt: item.savedAt } : item;
    });
    localStorage.setItem("daily-word:saved-words", JSON.stringify(latestWords));
    return latestWords;
  } catch {
    return [];
  }
}

const VolumeIcon = () => (
  <svg viewBox="0 0 24 24" aria-hidden="true">
    <path d="M5 9v6h4l5 4V5L9 9H5Zm12.2-.8a5.4 5.4 0 0 1 0 7.6M19.8 5.6a9 9 0 0 1 0 12.8" />
  </svg>
);

const HeartIcon = () => (
  <svg viewBox="0 0 24 24" aria-hidden="true">
    <path d="M20.8 4.7a5.5 5.5 0 0 0-7.8 0L12 5.8l-1.1-1.1a5.5 5.5 0 0 0-7.8 7.8l1.1 1.1L12 21l7.8-7.4 1.1-1.1a5.5 5.5 0 0 0-.1-7.8Z" />
  </svg>
);

export default function SavedWordsPage() {
  const [savedWords, setSavedWords] = useState<SavedWord[]>([]);
  const [query, setQuery] = useState("");
  const [speakingWord, setSpeakingWord] = useState("");
  const [selectedWord, setSelectedWord] = useState<SavedWord | null>(null);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    setSavedWords(readSavedWords());
    setReady(true);
  }, []);

  useEffect(() => {
    if (!selectedWord) return;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") setSelectedWord(null);
    };
    window.addEventListener("keydown", closeOnEscape);
    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", closeOnEscape);
    };
  }, [selectedWord]);

  const filteredWords = useMemo(() => {
    const keyword = query.trim().toLowerCase();
    if (!keyword) return savedWords;
    return savedWords.filter(
      (item) =>
        item.word.toLowerCase().includes(keyword) ||
        item.meaning.includes(keyword) ||
        item.description.includes(keyword),
    );
  }, [query, savedWords]);

  function listen(word: string) {
    if (!("speechSynthesis" in window)) return;
    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(word);
    utterance.lang = "en-US";
    utterance.rate = 0.78;
    utterance.onstart = () => setSpeakingWord(word);
    utterance.onend = () => setSpeakingWord("");
    utterance.onerror = () => setSpeakingWord("");
    window.speechSynthesis.speak(utterance);
  }

  function removeWord(word: string) {
    const nextWords = savedWords.filter((item) => item.word !== word);
    setSavedWords(nextWords);
    localStorage.setItem("daily-word:saved-words", JSON.stringify(nextWords));
    if (word === "serendipity") {
      localStorage.setItem("daily-word:saved:serendipity", "false");
    }
    setSelectedWord(null);
  }

  return (
    <main className="page-shell saved-page-shell">
      <div className="paper-speckles" aria-hidden="true" />
      <span className="doodle saved-doodle-one" aria-hidden="true">✦</span>
      <span className="doodle saved-doodle-two" aria-hidden="true">♡</span>

      <article className="app-frame saved-frame">
        <header className="saved-header">
          <a className="back-button" href="/" aria-label="오늘의 단어로 돌아가기">‹</a>
          <div>
            <p className="eyebrow">MY WORD POCKET</p>
            <h1>저장한 단어</h1>
          </div>
          <span className="pocket-stamp" aria-label={`${savedWords.length}개 저장됨`}>
            {savedWords.length}<small>WORDS</small>
          </span>
        </header>

        <label className="word-search">
          <span aria-hidden="true">⌕</span>
          <input
            type="search"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="영어 또는 뜻으로 검색"
            aria-label="저장한 단어 검색"
          />
          {query && <button type="button" onClick={() => setQuery("")} aria-label="검색어 지우기">×</button>}
        </label>

        <div className="saved-list-heading">
          <h2>나의 단어 주머니</h2>
          <span>{filteredWords.length}개</span>
        </div>

        {ready && filteredWords.length > 0 ? (
          <section className="saved-word-list" aria-label="저장한 단어 목록">
            {filteredWords.map((item, index) => (
              <button
                className="compact-word-row"
                key={item.word}
                type="button"
                onClick={() => setSelectedWord(item)}
                aria-label={`${item.word}, ${item.meaning} 상세 보기`}
              >
                <div className={`word-index color-${(index % 3) + 1}`}>{String(index + 1).padStart(2, "0")}</div>
                <div className="compact-word-copy">
                  <strong>{item.word}</strong>
                  <span>{item.meaning}</span>
                </div>
                <small>{item.savedAt}</small>
                <span className="compact-row-arrow" aria-hidden="true">›</span>
              </button>
            ))}
          </section>
        ) : ready ? (
          <section className="saved-empty">
            <div aria-hidden="true">♡</div>
            <h2>{query ? "검색 결과가 없어요" : "단어 주머니가 비어 있어요"}</h2>
            <p>{query ? "다른 검색어를 입력해 보세요." : "오늘의 단어에서 하트를 눌러 저장해 보세요."}</p>
            {!query && <a href="/">오늘의 단어 만나러 가기</a>}
          </section>
        ) : (
          <div className="saved-loading">단어 주머니를 여는 중…</div>
        )}

        <nav className="saved-bottom-nav" aria-label="주요 페이지">
          <a href="/"><span aria-hidden="true">⌂</span><small>오늘의 단어</small></a>
          <a className="is-active" href="/saved" aria-current="page"><span aria-hidden="true">♥</span><small>저장한 단어</small></a>
          <a href="/quiz?mode=saved"><span aria-hidden="true">✦</span><small>복습 퀴즈</small></a>
        </nav>
      </article>

      {selectedWord && (
        <div className="saved-detail-backdrop" role="presentation" onMouseDown={() => setSelectedWord(null)}>
          <section
            className="saved-detail-modal"
            role="dialog"
            aria-modal="true"
            aria-labelledby="saved-detail-title"
            onMouseDown={(event) => event.stopPropagation()}
          >
            <button className="saved-detail-close" type="button" onClick={() => setSelectedWord(null)} aria-label="상세 팝업 닫기">×</button>
            <p className="saved-detail-kicker">MY SAVED WORD</p>
            <div className="saved-detail-title">
              <div>
                <h2 id="saved-detail-title">{selectedWord.word}</h2>
                <p>{selectedWord.pronunciation}</p>
              </div>
              <button
                className={`saved-sound ${speakingWord === selectedWord.word ? "is-speaking" : ""}`}
                type="button"
                onClick={() => listen(selectedWord.word)}
                aria-label={`${selectedWord.word} 발음 듣기`}
              >
                <VolumeIcon />
              </button>
            </div>
            <div className="saved-detail-meaning">
              <strong>{selectedWord.meaning}</strong>
              <p>{selectedWord.description}</p>
            </div>
            <div className="saved-example saved-detail-example">
              <span>예문</span>
              <p>{selectedWord.example}</p>
              <small>{selectedWord.translation}</small>
            </div>
            <div className="saved-detail-footer">
              <span>{selectedWord.savedAt} 저장</span>
              <button type="button" onClick={() => removeWord(selectedWord.word)}>
                <HeartIcon /> 저장 해제
              </button>
            </div>
          </section>
        </div>
      )}
    </main>
  );
}
