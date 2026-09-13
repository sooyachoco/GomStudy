export type EtymologyMeta = {
  language: string;
  root?: string;
  prefix?: string;
  concept?: string;
  shift?: string;
};

/** Curated metadata used only to make etymology distractors structurally similar. */
export const ETYMOLOGY_META: Record<string, EtymologyMeta> = {
  acquire: { language: "라틴어", root: "acquirere", concept: "더하여 얻다", shift: "얻다 → 습득하다" },
  delve: { language: "고대 영어", root: "delfan", concept: "땅을 파다", shift: "파다 → 깊이 조사하다" },
  academy: { language: "그리스어", root: "Akademeia", concept: "배움의 장소", shift: "장소 이름 → 교육 기관" },
  instruction: { language: "라틴어", root: "instruere", concept: "안에 쌓아 올리다", shift: "쌓다 → 가르치다" },
  recollection: { language: "라틴어", root: "recollectus", prefix: "re", concept: "다시 모으다", shift: "다시 모으다 → 기억을 되살리다" },
  concentrate: { language: "라틴어", root: "centrum", concept: "중심", shift: "중심에 모으다 → 집중하다" },
  rehearse: { language: "옛 프랑스어", root: "rehercier", prefix: "re", concept: "다시 고르게 다듬다", shift: "되풀이하다 → 연습하다" },
  proficiency: { language: "라틴어", root: "proficere", prefix: "pro", concept: "앞으로 나아가다", shift: "발전하다 → 숙련되다" },
  aptitude: { language: "라틴어", root: "aptus", concept: "알맞게 맞춰진", shift: "적합하다 → 소질" },
  endeavor: { language: "중세 영어", root: "dever", concept: "의무", shift: "의무 → 힘써 시도하다" },
  advancement: { language: "라틴어", root: "abante", concept: "앞쪽", shift: "앞으로 나아가다 → 발전하다" },
  refine: { language: "프랑스어", root: "fine", prefix: "re", concept: "다시 순수하게 만들다", shift: "정제하다 → 다듬고 개선하다" },
  uncover: { language: "영어", root: "cover", prefix: "un", concept: "덮개를 벗기다", shift: "덮인 것을 열다 → 밝혀내다" },
  investigate: { language: "라틴어", root: "investigare", concept: "발자국을 따라가다", shift: "흔적을 좇다 → 조사하다" },
  inquiry: { language: "라틴어", root: "inquirere", prefix: "in", concept: "안으로 찾아 들어가다", shift: "찾다 → 자세히 묻다" },
  response: { language: "라틴어", root: "respondere", prefix: "re", concept: "되돌려 답하다", shift: "답하다 → 응답하다" },
  notion: { language: "라틴어", root: "notio", concept: "알게 됨", shift: "앎 → 생각·개념" },
  generate: { language: "라틴어", root: "generare", concept: "낳다, 생기게 하다", shift: "낳다 → 만들어 내다" },
  envision: { language: "영어", root: "vision", prefix: "en", concept: "눈앞에 보다", shift: "보다 → 마음속에 그리다" },
  devise: { language: "라틴어", root: "dividere", concept: "나누다", shift: "나누고 정리하다 → 고안하다" },
  configuration: { language: "라틴어", root: "configurare", prefix: "con", concept: "함께 형태를 만들다", shift: "형태를 함께 만들다 → 배열·구성" },
  approach: { language: "옛 프랑스어", root: "aprochier", concept: "가까이 가다", shift: "다가가다 → 접근법" },
  tendency: { language: "라틴어", root: "tendere", concept: "어떤 방향으로 뻗다", shift: "향하다 → 경향" },
  regimen: { language: "라틴어", root: "regere", concept: "다스리고 이끌다", shift: "이끌다 → 생활 관리법" },
  perseverance: { language: "라틴어", root: "perseverare", prefix: "per", concept: "계속하다", shift: "계속하다 → 끈기" },
  obstacle: { language: "라틴어", root: "obstare", concept: "앞을 가로막고 서다", shift: "막아서다 → 장애물" },
  accomplish: { language: "라틴어", root: "complere", concept: "완전히 채우다", shift: "채우다 → 완수하다" },
  attainment: { language: "라틴어", root: "attingere", prefix: "ad", concept: "손을 뻗어 닿다", shift: "닿다 → 목표를 달성하다" },
  discernment: { language: "라틴어", root: "discernere", prefix: "dis", concept: "서로 다른 것을 가려 나누다", shift: "가르다 → 분별하다" },
  expertise: { language: "라틴어", root: "expertus", concept: "직접 시험해 본", shift: "경험하다 → 전문성" },
  enigma: { language: "그리스어", root: "ainigma", concept: "돌려 말한 수수께끼", shift: "수수께끼 → 풀기 어려운 존재" },
  enchantment: { language: "옛 프랑스어", root: "enchanter", concept: "노래나 주문으로 매혹하다", shift: "매혹하다 → 황홀하게 하다" },
  apparition: { language: "라틴어", root: "apparere", concept: "나타나다", shift: "나타나다 → 유령 같은 형상" },
  creature: { language: "라틴어", root: "creatura", concept: "만들어진 것", shift: "창조된 것 → 생물·존재" },
  penumbra: { language: "라틴어", root: "paene/umbra", concept: "거의 그림자", shift: "빛과 어둠 사이 → 반그림자" },
  disguise: { language: "옛 프랑스어", root: "desguiser", concept: "본래 모습과 다르게 꾸미다", shift: "꾸미다 → 변장하다" },
  facade: { language: "프랑스어", root: "façade", concept: "건물의 앞면", shift: "앞면 → 겉모습" },
};
