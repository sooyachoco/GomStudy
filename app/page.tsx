"use client";

import { useEffect, useState } from "react";
import { MONTH_NAMES, MONTH_WORDS, getDefaultDate, getWordBySavedAt } from "./words";

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
    return words.map((item) => {
      const latest = getWordBySavedAt(item.savedAt);
      return latest ? { ...latest, savedAt: item.savedAt } : item;
    });
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

const ReviewIcon = () => (
  <svg viewBox="0 0 24 24" aria-hidden="true">
    <path d="M20 7v5h-5M4 17v-5h5M6.1 8.2a7 7 0 0 1 11.6-1.6L20 9M4 15l2.3 2.4a7 7 0 0 0 11.6-1.6" />
  </svg>
);

const ArrowIcon = () => (
  <svg viewBox="0 0 24 24" aria-hidden="true">
    <path d="M5 12h14m-5-5 5 5-5 5" />
  </svg>
);

export default function Home() {
  const [selectedMonth, setSelectedMonth] = useState(8);
  const [selectedDay, setSelectedDay] = useState(1);
  const [saved, setSaved] = useState(false);
  const [completed, setCompleted] = useState(false);
  const [completionOpen, setCompletionOpen] = useState(false);
  const [calendarOpen, setCalendarOpen] = useState(false);
  const [storyOpen, setStoryOpen] = useState(true);
  const [toast, setToast] = useState("");
  const [speaking, setSpeaking] = useState(false);
  const monthWords = MONTH_WORDS[selectedMonth];
  const monthName = MONTH_NAMES[selectedMonth];
  const current = monthWords[selectedDay - 1];

  useEffect(() => {
    const date = getDefaultDate();
    setSelectedMonth(date.month);
    setSelectedDay(date.day);
  }, []);

  useEffect(() => {
    const savedWords = readSavedWords();
    setSaved(savedWords.some((item) => item.word === current.word));
    setCompleted(localStorage.getItem(`daily-word:completed:2026-${String(selectedMonth).padStart(2, "0")}-${String(selectedDay).padStart(2, "0")}`) === "true");
    setStoryOpen(true);
    setSpeaking(false);
  }, [current.word, selectedDay, selectedMonth]);

  useEffect(() => {
    if (!toast) return;
    const timer = window.setTimeout(() => setToast(""), 1800);
    return () => window.clearTimeout(timer);
  }, [toast]);

  useEffect(() => {
    if (!calendarOpen) return;
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") setCalendarOpen(false);
    };
    window.addEventListener("keydown", closeOnEscape);
    return () => window.removeEventListener("keydown", closeOnEscape);
  }, [calendarOpen]);

  function selectDate(month: number, day: number) {
    setSelectedMonth(month);
    setSelectedDay(day);
    setCalendarOpen(false);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  function selectDay(day: number) {
    selectDate(selectedMonth, day);
  }

  function moveDate(step: -1 | 1) {
    if (step === -1 && selectedDay > 1) return selectDay(selectedDay - 1);
    if (step === 1 && selectedDay < monthWords.length) return selectDay(selectedDay + 1);
    const nextMonth = selectedMonth + step;
    if (nextMonth < 8 || nextMonth > 12) return;
    selectDate(nextMonth, step === 1 ? 1 : MONTH_WORDS[nextMonth].length);
  }

  function listen() {
    if (!("speechSynthesis" in window)) {
      setToast("이 브라우저에서는 음성 재생을 지원하지 않아요.");
      return;
    }
    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(current.word);
    utterance.lang = "en-US";
    utterance.rate = 0.78;
    utterance.onstart = () => setSpeaking(true);
    utterance.onend = () => setSpeaking(false);
    utterance.onerror = () => {
      setSpeaking(false);
      setToast("발음을 재생하지 못했어요.");
    };
    window.speechSynthesis.speak(utterance);
  }

  function toggleSave() {
    const payload: SavedWord = {
      word: current.word,
      pronunciation: current.pronunciation,
      meaning: current.meaning,
      description: current.description,
      example: current.example,
      translation: current.translation,
      savedAt: `2026.${String(selectedMonth).padStart(2, "0")}.${String(selectedDay).padStart(2, "0")}`,
    };
    const nextSaved = !saved;
    const savedWords = readSavedWords();
    const nextWords = nextSaved
      ? [payload, ...savedWords.filter((item) => item.word !== current.word)]
      : savedWords.filter((item) => item.word !== current.word);
    setSaved(nextSaved);
    localStorage.setItem("daily-word:saved-words", JSON.stringify(nextWords));
    setToast(nextSaved ? "단어 주머니에 저장했어요!" : "저장을 해제했어요.");
  }

  function finishToday() {
    const key = `daily-word:completed:2026-${String(selectedMonth).padStart(2, "0")}-${String(selectedDay).padStart(2, "0")}`;
    setCompleted(true);
    setCompletionOpen(true);
    localStorage.setItem(key, "true");
  }

  function continueJourney() {
    setCompletionOpen(false);
    moveDate(1);
  }

  return (
    <main className="page-shell">
      <div className="paper-speckles" aria-hidden="true" />
      <span className="doodle doodle-plane" aria-hidden="true">↗</span>
      <span className="doodle doodle-flower" aria-hidden="true">✿</span>
      <span className="doodle doodle-star" aria-hidden="true">✦</span>

      <article className="app-frame" aria-label={`${monthName} Gom영단어 학습 화면`}>
        <header className="app-header">
          <div>
            <h1>Gom영단어 <span aria-hidden="true">✎</span></h1>
          </div>
          <div className={`day-badge ${completed ? "is-complete" : ""}`}>
            {monthName} {selectedDay}일{completed ? " ✓" : ""}
          </div>
        </header>

        <section className="progress-card" aria-label={`${monthName} ${monthWords.length}일 중 ${selectedDay}일`}>
          <div className="progress-copy">
            <span>{monthName} 단어 여행</span>
            <strong>{selectedDay} / {monthWords.length}</strong>
          </div>
          <div className="progress-track" aria-hidden="true">
            <div className="progress-value" style={{ width: `${(selectedDay / monthWords.length) * 100}%` }}>
              <span>✦</span>
            </div>
          </div>
          <div className="date-navigator">
            <button type="button" disabled={selectedMonth === 8 && selectedDay === 1} onClick={() => moveDate(-1)} aria-label="이전 날짜">‹</button>
            <button className="calendar-trigger" type="button" onClick={() => setCalendarOpen(true)}>
              <span>{monthName} {selectedDay}일</span>
              <small>날짜 선택 ▾</small>
            </button>
            <button type="button" disabled={selectedMonth === 12 && selectedDay === 31} onClick={() => moveDate(1)} aria-label="다음 날짜">›</button>
          </div>
        </section>

        <section className="word-card" key={`word-${current.day}`}>
          <span className="corner-spark spark-left" aria-hidden="true">✳</span>
          <span className="corner-spark spark-right" aria-hidden="true">❋</span>
          <p className="today-label">DAY {String(selectedDay).padStart(2, "0")} · TODAY&apos;S WORD</p>
          <h2 className={current.word.length > 10 ? "long-word" : ""}>{current.word}</h2>
          <button className={`pronunciation ${speaking ? "is-speaking" : ""}`} type="button" aria-label={`${current.word} 발음 듣기`} onClick={listen}>
            <span className="mini-volume"><VolumeIcon /></span>
            {current.pronunciation}
          </button>
          <div className="stitch-line" aria-hidden="true" />
          <p className="meaning">{current.meaning}</p>
          <p className="sub-meaning">{current.description}</p>
        </section>

        <figure className="story-figure">
          <img
            key={current.image}
            src={current.image}
            alt={current.imageAlt}
            onError={(event) => { event.currentTarget.src = "/assets/serendipity-story.jpg"; }}
          />
          <button className="story-caption" type="button" aria-expanded={storyOpen} onClick={() => setStoryOpen((open) => !open)}>
            <span className="story-seal" aria-hidden="true">말의<br />여행</span>
            <span>
              <small>재미있는 어원 이야기</small>
              <strong>{current.originTitle}</strong>
            </span>
            <span className={`caption-arrow ${storyOpen ? "is-open" : ""}`} aria-hidden="true">›</span>
          </button>
        </figure>

        {storyOpen && (
          <section className="story-card">
            <div className="story-number">{String(selectedDay).padStart(2, "0")}</div>
            <div>
              <p>{current.origin}</p>
              <p className="story-example">
                <span>예문</span>
                “{current.example}”
                <small>{current.translation}</small>
              </p>
            </div>
          </section>
        )}

        <a className="quiz-invite" href={`/quiz?month=${selectedMonth}&day=${selectedDay}`}>
          <img src="/assets/quiz/ready.jpg" alt="퀴즈 카드를 든 곰과 토끼" />
          <span><small>GOM &amp; CHOCO QUIZ</small><strong>오늘의 단어, 3문제로 확인해요!</strong><em>퀴즈 시작하기 →</em></span>
        </a>

        <nav className="action-dock" aria-label="학습 기능">
          <button className={`action-button sound ${speaking ? "is-active" : ""}`} type="button" onClick={listen} aria-pressed={speaking}>
            <span><VolumeIcon /></span><small>듣기</small>
          </button>
          <button className={`action-button save ${saved ? "is-saved" : ""}`} type="button" onClick={toggleSave} aria-pressed={saved}>
            <span><HeartIcon /></span><small>{saved ? "저장됨" : "저장"}</small>
          </button>
          <a className="action-button review" href="/saved" aria-label="저장한 단어 보기">
            <span><ReviewIcon /></span><small>복습</small>
          </a>
          <button className="action-button next" type="button" onClick={finishToday}>
            <span><ArrowIcon /></span><small>완료</small>
          </button>
        </nav>
      </article>

      {toast && <div className="toast" role="status">{toast}</div>}

      {calendarOpen && (
        <div className="modal-backdrop calendar-backdrop" role="presentation" onMouseDown={() => setCalendarOpen(false)}>
          <section className="calendar-sheet" role="dialog" aria-modal="true" aria-labelledby="calendar-title" onMouseDown={(event) => event.stopPropagation()}>
            <button className="sheet-close" type="button" onClick={() => setCalendarOpen(false)} aria-label="달력 닫기">×</button>
            <p className="sheet-kicker">153 DAYS · 153 STORIES</p>
            <h2 id="calendar-title">{monthName} 단어 달력</h2>
            <div className="month-tabs" role="tablist" aria-label="학습 월 선택">
              {[8, 9, 10, 11, 12].map((month) => (
                <button
                  type="button"
                  role="tab"
                  aria-selected={month === selectedMonth}
                  className={month === selectedMonth ? "is-selected" : ""}
                  key={month}
                  onClick={() => { setSelectedMonth(month); setSelectedDay(1); }}
                >{month}월</button>
              ))}
            </div>
            <div className="word-calendar">
              {monthWords.map((item) => (
                <button className={item.day === selectedDay ? "is-selected" : ""} type="button" key={item.day} onClick={() => selectDay(item.day)}>
                  <strong>{item.day}</strong><small>{item.word}</small>
                </button>
              ))}
            </div>
          </section>
        </div>
      )}

      {completionOpen && (
        <div className="modal-backdrop completion-backdrop" role="presentation">
          <section className="completion-sheet" role="dialog" aria-modal="true" aria-labelledby="complete-title">
            <div className="confetti" aria-hidden="true">✦　✿　✦</div>
            <span className="completion-stamp" aria-hidden="true">✓</span>
            <p>DAY {String(selectedDay).padStart(2, "0")} COMPLETE</p>
            <h2 id="complete-title">오늘의 단어 여행 완료!</h2>
            <p className="completion-copy"><strong>{current.word}</strong>를 기억 주머니에 넣었어요.<br />내일의 단어도 만나볼까요?</p>
            <button type="button" onClick={continueJourney}>{selectedMonth < 12 || selectedDay < monthWords.length ? "다음 단어 보기" : "올해의 단어 여행 마무리"}</button>
          </section>
        </div>
      )}
    </main>
  );
}
