"use client";

import { useEffect, useMemo, useState } from "react";
import { getDefaultDate, getWordBySavedAt, MONTH_NAMES, MONTH_WORDS } from "../words";
import { ETYMOLOGY_META } from "../etymology-meta";

type QuizWord = {
  word: string;
  meaning: string;
  origin: string;
  example: string;
  translation: string;
  originMeta?: { language?: string; root?: string; prefix?: string; concept?: string; shift?: string };
};

type QuizQuestion = {
  prompt: string;
  detail: string;
  choices: string[];
  answer: string;
  word: QuizWord;
};

const ALL_WORDS: QuizWord[] = Object.values(MONTH_WORDS).flat();

function hash(text: string) {
  return [...text].reduce((value, character) => ((value * 31) + character.charCodeAt(0)) >>> 0, 17);
}

function shuffled<T>(items: T[], seed: number) {
  const result = [...items];
  let value = seed || 1;
  for (let index = result.length - 1; index > 0; index -= 1) {
    value = (value * 1664525 + 1013904223) >>> 0;
    const target = value % (index + 1);
    [result[index], result[target]] = [result[target], result[index]];
  }
  return result;
}

function choicesFor(correct: string, candidates: string[], seed: number) {
  const alternatives = [...new Set(candidates)]
    .map((item) => item.trim())
    .filter(Boolean)
    .filter((item) => item !== correct.trim());
  return shuffled([correct, ...shuffled(alternatives, seed).slice(0, 3)], seed + 97);
}

const ORIGIN_LANGUAGES = [
  "고대 영어", "중세 영어", "옛 영어", "영어", "라틴어", "그리스어", "프랑스어", "옛 프랑스어", "중세 프랑스어", "독일어", "이탈리아어", "스페인어", "네덜란드어", "아랍어", "히브리어", "산스크리트어", "포르투갈어", "북유럽어",
];

const ORIGIN_STOP_WORDS = new Set([
  "라는", "뜻이에요", "뜻이었어요", "뜻으로", "뜻에서", "뜻이", "말이에요", "말이죠", "말을", "가리켜요", "가리켜", "말해요", "쓰여요", "자리", "잡았어요", "됐어요", "되었어요", "담고", "있어요", "모습", "어떤", "것", "그", "이", "저", "및", "또는", "하는", "하는데", "위해", "통해", "따라", "처음", "오늘", "실제",
]);

function originLanguage(origin: string) {
  return ORIGIN_LANGUAGES.find((language) => origin.includes(language)) || "";
}

function originTokens(origin: string) {
  return origin
    .replace(/[“”‘’'".,!?·()[\]{}:;]/g, " ")
    .split(/\s+/)
    .map((token) => token.trim())
    .filter((token) => token.length >= 2 && !ORIGIN_STOP_WORDS.has(token));
}

function originFingerprint(item: QuizWord) {
  const origin = item.origin;
  const meta = ETYMOLOGY_META[item.word] || item.originMeta;
  const language = meta?.language || originLanguage(origin);
  const lower = origin.toLowerCase();
  const morphology = meta?.prefix || ["re와", "un과", "en과", "de와", "con과", "com과", "pro와", "per와", "a와", "ad와", "in과", "ex와", "trans와"]
    .find((marker) => lower.includes(marker)) || "";
  return {
    language,
    morphology,
    root: meta?.root || "",
    concept: meta?.concept || "",
    shift: meta?.shift || "",
    tokens: new Set(originTokens(origin)),
  };
}

function originSimilarity(target: QuizWord, candidate: QuizWord) {
  const a = originFingerprint(target);
  const b = originFingerprint(candidate);
  let score = 0;
  if (a.language && a.language === b.language) score += 6;
  if (a.morphology && a.morphology === b.morphology) score += 5;
  if (a.root && a.root === b.root) score += 8;
  if (a.concept && a.concept === b.concept) score += 5;
  if (a.shift && a.shift === b.shift) score += 3;
  let overlap = 0;
  a.tokens.forEach((token) => { if (b.tokens.has(token)) overlap += 1; });
  score += Math.min(overlap, 3) * 2;
  const aRoots = target.origin.match(/[A-Za-z]{3,}/g) || [];
  const bRoots = candidate.origin.match(/[A-Za-z]{3,}/g) || [];
  const rootOverlap = aRoots.filter((root) => bRoots.some((other) => other.toLowerCase() === root.toLowerCase())).length;
  score += Math.min(rootOverlap, 2) * 5;
  if (target.origin.includes("다시") && candidate.origin.includes("다시")) score += 2;
  if (target.origin.includes("앞") && candidate.origin.includes("앞")) score += 2;
  if (target.origin.includes("안") && candidate.origin.includes("안")) score += 2;
  if (target.origin.includes("함께") && candidate.origin.includes("함께")) score += 2;
  if (target.origin.includes("만들") && candidate.origin.includes("만들")) score += 2;
  return score;
}

function originChoicesFor(correct: QuizWord, words: QuizWord[], seed: number) {
  const candidates = [...new Map(
    words
      .filter((item) => item.origin.trim() && item.origin.trim() !== correct.origin.trim())
      .map((item) => [item.origin.trim(), item]),
  ).values()];
  const ranked = candidates
    .map((item, index) => ({ item, score: originSimilarity(correct, item), tie: hash(`${item.origin}-${seed}-${index}`) }))
    .sort((a, b) => b.score - a.score || a.tie - b.tie);
  const selected = ranked.slice(0, Math.min(3, ranked.length)).map((item) => item.item.origin);
  return shuffled([correct.origin, ...selected], seed + 97);
}

function buildDailyQuiz(target: QuizWord, seed: number): QuizQuestion[] {
  const escapedWord = target.word.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  const blankExample = target.example.replace(new RegExp(`\\b${escapedWord}\\b`, "i"), "______");
  return [
    { prompt: `“${target.word}”의 뜻은 무엇일까요?`, detail: "단어의 핵심 의미를 골라 보세요.", choices: choicesFor(target.meaning, ALL_WORDS.map((item) => item.meaning), seed), answer: target.meaning, word: target },
    { prompt: `“${target.word}”의 어원으로 알맞은 것은?`, detail: "비슷한 어원까지 살펴보고 가장 정확한 설명을 골라 보세요.", choices: originChoicesFor(target, ALL_WORDS, seed + 1), answer: target.origin, word: target },
    { prompt: blankExample === target.example ? `오늘의 단어를 다시 골라 보세요.` : blankExample, detail: blankExample === target.example ? target.translation : `예문 해석 · ${target.translation}`, choices: choicesFor(target.word, ALL_WORDS.map((item) => item.word), seed + 2), answer: target.word, word: target },
  ];
}

function buildSavedQuiz(words: QuizWord[]): QuizQuestion[] {
  const targets = shuffled(words, 153).slice(0, Math.min(5, words.length));
  return targets.map((target, index) => ({
    prompt: index % 2 === 0 ? `“${target.meaning}”에 맞는 단어는?` : `“${target.word}”의 뜻은?`, detail: index % 2 === 0 ? "단어주머니에서 꺼낸 복습 문제예요." : target.example,
    choices: index % 2 === 0 ? choicesFor(target.word, ALL_WORDS.map((item) => item.word), 500 + index) : choicesFor(target.meaning, ALL_WORDS.map((item) => item.meaning), 500 + index),
    answer: index % 2 === 0 ? target.word : target.meaning, word: target,
  }));
}

export default function QuizPage() {
  const [mode, setMode] = useState<"daily" | "saved">("daily");
  const [title, setTitle] = useState("오늘의 퀴즈");
  const [questions, setQuestions] = useState<QuizQuestion[]>([]);
  const [questionIndex, setQuestionIndex] = useState(0);
  const [selected, setSelected] = useState("");
  const [score, setScore] = useState(0);
  const [finished, setFinished] = useState(false);
  const [savedFallback, setSavedFallback] = useState(false);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const requestedMode = params.get("mode") === "saved" ? "saved" : "daily";
    setMode(requestedMode);
    if (requestedMode === "saved") {
      let savedWords: QuizWord[] = [];
      try { savedWords = JSON.parse(localStorage.getItem("daily-word:saved-words") || "[]").map((item: QuizWord & { savedAt?: string }) => item.savedAt ? (getWordBySavedAt(item.savedAt) || item) : item); } catch { savedWords = []; }
      if (savedWords.length >= 2) { setTitle("단어주머니 복습"); setQuestions(buildSavedQuiz(savedWords)); }
      else { const defaults = getDefaultDate(); const target = MONTH_WORDS[defaults.month][defaults.day - 1]; setSavedFallback(true); setTitle("오늘의 퀴즈"); setQuestions(buildDailyQuiz(target, hash(`${defaults.month}-${defaults.day}`))); }
      return;
    }
    const defaults = getDefaultDate();
    const month = Number(params.get("month")) || defaults.month;
    const safeMonth = MONTH_WORDS[month] ? month : defaults.month;
    const day = Math.min(Math.max(Number(params.get("day")) || defaults.day, 1), MONTH_WORDS[safeMonth].length);
    const target = MONTH_WORDS[safeMonth][day - 1];
    setTitle(`${MONTH_NAMES[safeMonth]} ${day}일 퀴즈`);
    setQuestions(buildDailyQuiz(target, hash(`${safeMonth}-${day}-${target.word}`)));
  }, []);

  const current = questions[questionIndex];
  const isCorrect = Boolean(selected) && selected === current?.answer;
  const characterImage = selected ? (isCorrect ? "/assets/quiz/correct.jpg" : "/assets/quiz/encourage.jpg") : "/assets/quiz/ready.jpg";
  const progress = questions.length ? ((questionIndex + (finished ? 1 : 0)) / questions.length) * 100 : 0;
  const resultMessage = useMemo(() => {
    if (!questions.length) return "";
    const ratio = score / questions.length;
    if (ratio === 1) return "완벽해요! 오늘의 단어가 머릿속에 쏙 들어왔어요.";
    if (ratio >= 0.6) return "좋아요! 한 번만 더 풀면 완벽하게 기억할 거예요.";
    return "괜찮아요. 곰과 토끼가 다시 한번 같이 풀어 줄게요.";
  }, [questions.length, score]);

  function choose(choice: string) {
    if (selected === current.answer) return;
    setSelected(choice);
    if (choice === current.answer) setScore((value) => value + 1);
  }

  function next() {
    if (!selected) return;
    if (questionIndex + 1 >= questions.length) { setFinished(true); localStorage.setItem(`daily-word:quiz:${mode}:last-score`, String(score)); return; }
    setQuestionIndex((value) => value + 1); setSelected("");
  }

  function retry() { setQuestionIndex(0); setSelected(""); setScore(0); setFinished(false); }

  if (!current) return <main className="quiz-shell"><div className="quiz-loading">퀴즈 카드를 섞는 중…</div></main>;

  return (
    <main className="quiz-shell"><article className="quiz-frame">
      <header className="quiz-header"><a href="/" aria-label="오늘의 단어로 돌아가기">‹</a><div><p>GOM &amp; CHOCO QUIZ</p><h1>{title}</h1></div><span>{finished ? "완료" : `${questionIndex + 1}/${questions.length}`}</span></header>
      <div className="quiz-progress" aria-hidden="true"><span style={{ width: `${progress}%` }} /></div>
      {savedFallback && !finished && <p className="quiz-notice">저장한 단어가 2개 이상이면 단어주머니 복습 퀴즈가 열려요. 오늘은 일일 퀴즈를 준비했어요.</p>}
      {!finished ? <>
        <figure className="quiz-characters"><img key={characterImage} src={characterImage} alt="퀴즈를 함께 푸는 곰과 토끼" /></figure>
        <section className="quiz-question-card" aria-live="polite"><p>QUESTION {questionIndex + 1}</p><h2>{current.prompt}</h2><small>{current.detail}</small></section>
        <div className="quiz-options">
          {current.choices.map((choice, index) => {
            const state = selected ? (choice === current.answer ? "is-correct" : choice === selected ? "is-wrong" : "is-muted") : "";
            return <button className={state} type="button" key={choice} onClick={() => choose(choice)} disabled={selected === current.answer}><span>{String.fromCharCode(65 + index)}</span>{choice}</button>;
          })}
        </div>
        {selected && <section className={`quiz-feedback ${isCorrect ? "is-correct" : "is-wrong"}`}>
          <div><strong>{isCorrect ? "정답이에요!" : "아직이에요! 다시 골라보세요."}</strong><p>{isCorrect ? <>정답은 <b>{current.answer}</b>예요.</> : "오답은 다시 눌러 바꿀 수 있어요."}</p></div>
          {isCorrect && <button type="button" onClick={next}>{questionIndex + 1 === questions.length ? "결과 보기" : "다음 문제"}</button>}
        </section>}
      </> : <section className="quiz-result"><img src={score === questions.length ? "/assets/quiz/correct.jpg" : "/assets/quiz/encourage.jpg"} alt="퀴즈 결과를 축하하는 곰과 토끼" /><p>QUIZ COMPLETE</p><h2><strong>{score}</strong> / {questions.length}</h2><h3>{resultMessage}</h3><div className="quiz-result-actions"><button type="button" onClick={retry}>다시 풀기</button><a href={mode === "saved" ? "/saved" : "/"}>단어로 돌아가기</a></div></section>}
      <nav className="quiz-bottom-nav" aria-label="퀴즈 종류"><a className={mode === "daily" ? "is-active" : ""} href="/quiz">오늘의 퀴즈</a><a className={mode === "saved" ? "is-active" : ""} href="/quiz?mode=saved">단어주머니 복습</a></nav>
    </article></main>
  );
}
