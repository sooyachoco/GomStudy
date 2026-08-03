import { SEPTEMBER_WORDS, OCTOBER_WORDS, NOVEMBER_WORDS, DECEMBER_WORDS } from "./additional-words";
import { applyVocabularyUpgrades } from "./vocabulary-upgrades";

export type AugustWord = {
  day: number;
  word: string;
  pronunciation: string;
  meaning: string;
  description: string;
  originTitle: string;
  origin: string;
  example: string;
  translation: string;
  image: string;
  imageAlt: string;
};

export type DailyWord = AugustWord & { month: number };

const art = (day: number, word: string) =>
  `/assets/august/${String(day).padStart(2, "0")}-${word}.jpg`;

export const AUGUST_WORDS: AugustWord[] = [
  {
    day: 1, word: "august", pronunciation: "/ˈɔː.ɡəst/", meaning: "위엄 있는", description: "존경을 불러일으키는 품격 있는 모습",
    originTitle: "한 황제의 이름이 달력에 남았어요", origin: "라틴어 augustus는 '존엄한, 신성한'이란 뜻이에요. 로마 황제 아우구스투스의 칭호와 8월의 이름 August가 여기서 나왔죠.",
    example: "The hall had an august atmosphere.", translation: "그 회관에는 위엄 있는 분위기가 감돌았어.", image: art(1, "august"), imageAlt: "아침햇살 아래 월계관과 대리석 문을 바라보는 여행자"
  },
  {
    day: 2, word: "companion", pronunciation: "/kəmˈpæn.jən/", meaning: "동료, 동반자", description: "길이나 시간을 함께 나누는 사람",
    originTitle: "빵을 나눈 사람이 동료가 됐어요", origin: "라틴어 com(함께) + panis(빵)가 합쳐져 '빵을 함께 먹는 사람'을 뜻했어요. 긴 여행에서 음식을 나누던 사이가 동반자가 된 거예요.",
    example: "Mina was a wonderful travel companion.", translation: "미나는 멋진 여행 동반자였어.", image: art(2, "companion"), imageAlt: "나무 아래서 한 덩이의 빵을 나누는 두 여행자"
  },
  {
    day: 3, word: "curiosity", pronunciation: "/ˌkjʊər.iˈɒs.ə.ti/", meaning: "호기심", description: "새로운 것을 알고 싶어 하는 마음",
    originTitle: "'관심과 돌봄'에서 호기심이 시작됐어요", origin: "라틴어 cura는 '관심, 돌봄'을 뜻해요. 무엇인가에 마음을 쓰다 보면 더 알고 싶어지는 감정으로 발전했죠.",
    example: "Curiosity led her through the tiny door.", translation: "호기심이 그녀를 작은 문 너머로 이끌었어.", image: art(3, "curiosity"), imageAlt: "거대한 나무의 작은 문 안에서 빛나는 도서관을 발견한 탐험가"
  },
  {
    day: 4, word: "inspire", pronunciation: "/ɪnˈspaɪər/", meaning: "영감을 주다", description: "새로운 생각이나 행동을 일으키다",
    originTitle: "영감은 마음에 불어넣는 숨결이었어요", origin: "라틴어 inspirare는 '안으로 숨을 불어넣다'라는 뜻이에요. 생각에 생명을 불어넣는 이미지가 지금의 뜻이 됐죠.",
    example: "The night sky inspired a new painting.", translation: "밤하늘이 새로운 그림의 영감을 줬어.", image: art(4, "inspire"), imageAlt: "별빛이 어린 화가의 스케치북 안으로 흘러드는 마법 같은 장면"
  },
  {
    day: 5, word: "sincere", pronunciation: "/sɪnˈsɪər/", meaning: "진심 어린", description: "거짓이나 가식 없이 솔직한",
    originTitle: "'밀랍 없이'라는 설은 멋진 신화예요", origin: "라틴어 sincerus는 '깨끗한, 온전한'을 뜻해요. '밀랍 없이' 만든 조각이란 유명한 설은 매력적이지만 언어학적 근거는 없답니다.",
    example: "Please accept my sincere thanks.", translation: "제 진심 어린 감사를 받아주세요.", image: art(5, "sincere"), imageAlt: "투명한 유리 새로 소중한 편지를 전하는 사람"
  },
  {
    day: 6, word: "salary", pronunciation: "/ˈsæl.ər.i/", meaning: "급여", description: "일의 대가로 정기적으로 받는 돈",
    originTitle: "급여 속에는 소금이 숨어 있어요", origin: "라틴어 sal(소금)과 연결된 salarium에서 왔어요. 로마의 여비나 수당과 관련된 말인데, 정확히 어떤 방식으로 소금과 연결됐는지는 논쟁이 있어요.",
    example: "She saved part of her salary each month.", translation: "그녀는 매달 급여의 일부를 저축했어.", image: art(6, "salary"), imageAlt: "소금 결정과 동전을 저울에 올린 로마 시대 상인"
  },
  {
    day: 7, word: "candidate", pronunciation: "/ˈkæn.dɪ.dət/", meaning: "후보자", description: "어떤 직위나 선택의 대상이 된 사람",
    originTitle: "후보자는 흰 토가를 입었어요", origin: "라틴어 candidatus는 '하얀 옷을 입은 사람'이에요. 로마의 공직 후보자들이 눈에 띄고 깨끗해 보이도록 흰 토가를 입었답니다.",
    example: "Each candidate gave a short speech.", translation: "각 후보자가 짧은 연설을 했어.", image: art(7, "candidate"), imageAlt: "흰 토가를 입고 광장에 선 로마 시대 후보자"
  },
  {
    day: 8, word: "clue", pronunciation: "/kluː/", meaning: "단서", description: "문제나 미스터리를 풀 수 있게 하는 힌트",
    originTitle: "단서는 원래 실타래였어요", origin: "clue의 옛 형태 clew는 '실타래'를 뜻했어요. 미로에서 실을 풀어 길을 찾은 테세우스 신화와 겹쳐지며 문제를 푸는 단서가 됐죠.",
    example: "A muddy footprint was the first clue.", translation: "진흙 묻은 발자국이 첫 단서였어.", image: art(8, "clue"), imageAlt: "미로 속에서 빛나는 실타래를 따라가는 작은 탐정"
  },
  {
    day: 9, word: "hazard", pronunciation: "/ˈhæz.əd/", meaning: "위험", description: "해나 손실을 일으킬 수 있는 요소",
    originTitle: "위험이란 말은 주사위 놀이에서 왔어요", origin: "아랍어 al-zahr(주사위)가 프랑스어를 거쳐 hazard가 됐다고 봐요. 결과를 알 수 없는 주사위 놀이가 위험이란 뜻으로 넓어진 거예요.",
    example: "Loose rocks are a hazard on this trail.", translation: "흐트러진 돌은 이 산길의 위험 요소야.", image: art(9, "hazard"), imageAlt: "절벽 길 앞에서 주사위 표지판을 발견한 여행자"
  },
  {
    day: 10, word: "robot", pronunciation: "/ˈrəʊ.bɒt/", meaning: "로봇", description: "자동으로 일을 수행하는 기계",
    originTitle: "로봇은 연극 무대에서 태어났어요", origin: "체코어 robota는 '강제 노역'을 뜻해요. 1920년 카렐 차페크의 희곡에서 인공 노동자를 robot이라 부르며 세계적인 단어가 됐죠.",
    example: "The robot delivered tea to the table.", translation: "로봇이 테이블로 차를 배달했어.", image: art(10, "robot"), imageAlt: "작은 극장 무대에서 차를 나르는 정겨운 고전 로봇"
  },
  {
    day: 11, word: "mentor", pronunciation: "/ˈmen.tɔːr/", meaning: "멘토, 조언자", description: "경험을 나누며 성장을 돕는 사람",
    originTitle: "멘토는 오디세이아 속 인물의 이름이에요", origin: "오디세우스가 떠나며 아들을 부탁한 친구 Mentor의 이름에서 왔어요. 지혜의 여신 아테나도 그의 모습으로 조언했죠.",
    example: "My mentor taught me to ask better questions.", translation: "나의 멘토는 더 좋은 질문을 하는 법을 가르쳐 줬어.", image: art(11, "mentor"), imageAlt: "바다를 바라보며 지도와 나침반을 함께 보는 스승과 제자"
  },
  {
    day: 12, word: "quarantine", pronunciation: "/ˈkwɒr.ən.tiːn/", meaning: "검역, 격리", description: "질병 확산을 막기 위해 일정 기간 분리하는 것",
    originTitle: "검역의 시간은 40일이었어요", origin: "이탈리아어 quaranta giorni는 '40일'이란 뜻이에요. 중세 베네치아에서 역병을 막기 위해 배와 사람을 40일간 기다리게 했죠.",
    example: "The rescued bird stayed in quarantine.", translation: "구조된 새는 검역 공간에 머물렀어.", image: art(12, "quarantine"), imageAlt: "항구 밖 바다에서 40개의 작은 불빛 아래 기다리는 배"
  },
  {
    day: 13, word: "nostalgia", pronunciation: "/nɒˈstæl.dʒə/", meaning: "향수", description: "과거의 장소나 시절을 그리워하는 마음",
    originTitle: "향수는 '돌아감의 아픔'이었어요", origin: "그리스어 nostos(귀향) + algos(아픔)를 합쳐 1688년 의학 용어로 만들었어요. 고향을 그리워하는 병으로 보던 거죠.",
    example: "The old song filled him with nostalgia.", translation: "그 옛노래는 그에게 향수를 불러일으켰어.", image: art(13, "nostalgia"), imageAlt: "오래된 음악 상자에서 빛나는 고향의 풍경이 피어오르는 장면"
  },
  {
    day: 14, word: "panic", pronunciation: "/ˈpæn.ɪk/", meaning: "공황, 극심한 두려움", description: "갑자기 몰려오는 강한 공포와 혼란",
    originTitle: "숲의 신 판의 소리가 공포를 만들었어요", origin: "그리스 신 판(Pan)이 숲속에서 갑자기 지르는 소리가 사람과 가축을 혼비백산하게 했다는 이야기에서 panic이 나왔어요.",
    example: "Take a breath and do not panic.", translation: "숨을 한 번 고르고 당황하지 마.", image: art(14, "panic"), imageAlt: "숲의 신이 피리를 불자 새들이 놀라 날아오르는 장면"
  },
  {
    day: 15, word: "sandwich", pronunciation: "/ˈsæn.wɪdʒ/", meaning: "샌드위치", description: "빵 사이에 재료를 넣어 먹는 음식",
    originTitle: "한 백작의 이름이 점심 메뉴가 됐어요", origin: "18세기 제4대 샌드위치 백작의 이름에서 나왔어요. 카드 놀이를 멈추지 않고 먹으려 빵 사이에 고기를 넣었다는 일화가 유명하지만 세부 사실은 논쟁적이에요.",
    example: "He packed a sandwich for the picnic.", translation: "그는 피크닉을 위해 샌드위치를 챙겼어.", image: art(15, "sandwich"), imageAlt: "카드 테이블 옆에서 화려한 샌드위치를 발견한 백작"
  },
  {
    day: 16, word: "marathon", pronunciation: "/ˈmær.ə.θɒn/", meaning: "마라톤", description: "42.195km를 달리는 장거리 경주",
    originTitle: "한 주자의 전설이 경주가 됐어요", origin: "고대 그리스 마라톤 평원의 전투 승리를 아테네에 전하려 달렸다는 피디피데스의 전설을 기념해 현대 경기가 만들어졌어요.",
    example: "Finishing the marathon was her dream.", translation: "마라톤을 완주하는 것이 그녀의 꿈이었어.", image: art(16, "marathon"), imageAlt: "올리브 나무 길을 달리며 승리 소식을 전하는 고대 그리스 주자"
  },
  {
    day: 17, word: "alphabet", pronunciation: "/ˈæl.fə.bet/", meaning: "알파벳, 문자 체계", description: "언어의 글자를 정해진 순서로 모은 것",
    originTitle: "첫 두 글자가 전체의 이름이 됐어요", origin: "그리스 문자의 첫째 alpha와 둘째 beta를 이어 alphabet이 됐어요. 마치 '가나다'로 문자 체계 전체를 부르는 것과 비슷해요.",
    example: "The child sang the alphabet song.", translation: "그 아이는 알파벳 노래를 불렀어.", image: art(17, "alphabet"), imageAlt: "파피루스에서 알파와 베타 문자가 새처럼 날아오르는 장면"
  },
  {
    day: 18, word: "museum", pronunciation: "/mjuˈziː.əm/", meaning: "박물관", description: "예술·역사·과학 자료를 보존하고 보여주는 곳",
    originTitle: "박물관은 무즈 여신들의 집이었어요", origin: "그리스어 Mouseion은 예술과 학문의 여신들인 Muses에게 바친 공간이에요. 학자들이 모여 연구하던 곳이 지금의 museum으로 이어졌죠.",
    example: "We spent the afternoon at the museum.", translation: "우리는 오후를 박물관에서 보냈어.", image: art(18, "museum"), imageAlt: "여신과 리라, 두루마리가 떠다니는 마법 같은 고대 박물관"
  },
  {
    day: 19, word: "galaxy", pronunciation: "/ˈɡæl.ək.si/", meaning: "은하", description: "수많은 별과 가스가 중력으로 모인 거대한 집단",
    originTitle: "은하수는 하늘의 우유 길이었어요", origin: "그리스어 galaxias는 gala(우유)에서 나왔어요. 밤하늘의 흰 띠가 흐른 우유처럼 보여 Milky Way라는 이름도 같은 이미지를 담았죠.",
    example: "Our galaxy contains billions of stars.", translation: "우리 은하에는 수십억 개의 별이 있어.", image: art(19, "galaxy"), imageAlt: "은빛 우유처럼 흐르는 은하를 작은 배로 건너는 여행자"
  },
  {
    day: 20, word: "disaster", pronunciation: "/dɪˈzɑː.stər/", meaning: "재앙, 대형 사고", description: "큰 피해와 불행을 일으키는 사건",
    originTitle: "재앙은 '나쁜 별'의 영향이었어요", origin: "이탈리아어 disastro는 dis(나쁜) + astro(별)의 결합이에요. 별의 배치가 인간의 운명을 결정한다고 믿던 시절의 표현이죠.",
    example: "Good planning prevented a disaster.", translation: "좋은 계획이 재앙을 막았어.", image: art(20, "disaster"), imageAlt: "불길한 별빛 아래 강한 비를 피해 등대로 향하는 배"
  },
  {
    day: 21, word: "calculate", pronunciation: "/ˈkæl.kjə.leɪt/", meaning: "계산하다", description: "숫자를 사용해 결과를 알아내다",
    originTitle: "계산기의 조상은 작은 조약돌이었어요", origin: "라틴어 calculus는 '작은 돌'을 뜻해요. 고대 사람들이 돌을 옮겨 수를 세고 계산했기 때문에 calculate가 나왔죠.",
    example: "Can you calculate the total cost?", translation: "전체 비용을 계산해 줄래?", image: art(21, "calculate"), imageAlt: "색색의 조약돌을 줄지어 수를 계산하는 고대 상인"
  },
  {
    day: 22, word: "silhouette", pronunciation: "/ˌsɪl.uˈet/", meaning: "실루엣, 윤곽", description: "밝은 배경에 어둡게 드러나는 모양",
    originTitle: "검은 윤곽 그림에 재무장관의 이름이 붙었어요", origin: "18세기 프랑스의 재무장관 에티엔 드 실루엣은 강한 절약 정책으로 유명했어요. 값싼 검은 윤곽 초상화를 '실루엣 방식'이라 놀리듯 부른 것이 이름으로 남았죠.",
    example: "We saw the silhouette of a deer.", translation: "우리는 사슴의 실루엣을 봤어.", image: art(22, "silhouette"), imageAlt: "주황빛 노을 앞에 사슴과 화가의 검은 윤곽이 보이는 장면"
  },
  {
    day: 23, word: "deadline", pronunciation: "/ˈded.laɪn/", meaning: "마감 기한", description: "일을 끝내거나 제출해야 하는 마지막 시점",
    originTitle: "마감선은 정말 넘으면 안 되는 선이었어요", origin: "미국 남북전쟁 시기 포로수용소의 경계선을 deadline이라 불렀어요. 이를 넘으면 사격될 수 있었죠. 나중에 신문 제작의 시간 한계를 뜻하게 됐어요.",
    example: "The deadline is Friday at noon.", translation: "마감은 금요일 정오야.", image: art(23, "deadline"), imageAlt: "바닥의 빨간 선과 거대한 시계 앞에서 원고를 든 기자"
  },
  {
    day: 24, word: "freelance", pronunciation: "/ˈfriː.lɑːns/", meaning: "프리랜서", description: "특정 조직에 속하지 않고 독립적으로 일하는 사람",
    originTitle: "자유로운 창은 돈을 따라 싸웠어요", origin: "free lance는 중세에 특정 주군이 없는 용병 기사의 '자유로운 창'을 뜻해요. 월터 스콧의 소설 《아이반호》가 이 표현을 널리 알렸죠.",
    example: "She works as a freelance illustrator.", translation: "그녀는 프리랜서 일러스트레이터로 일해.", image: art(24, "freelance"), imageAlt: "창 대신 연필을 들고 자유로운 길을 나서는 중세 기사"
  },
  {
    day: 25, word: "broadcast", pronunciation: "/ˈbrɔːd.kɑːst/", meaning: "방송하다", description: "많은 사람에게 라디오·TV·인터넷으로 전하다",
    originTitle: "방송은 씨앗을 넓게 뿌리는 일이었어요", origin: "broadcast는 농부가 씨앗을 한 곳에 심지 않고 넓게(broad) 흘려 뿌리는(cast) 농사법을 뜻했어요. 전파를 넓게 퍼뜨리는 방송의 이미지가 여기서 나왔죠.",
    example: "The concert was broadcast live.", translation: "그 콘서트는 생방송으로 전해졌어.", image: art(25, "broadcast"), imageAlt: "씨앗을 뿌리자 빛의 파동이 라디오 탑으로 퍼져 나가는 장면"
  },
  {
    day: 26, word: "emoji", pronunciation: "/ɪˈməʊ.dʒi/", meaning: "이모지", description: "감정·사물·행동을 나타내는 작은 그림 문자",
    originTitle: "emoji의 e는 emotion이 아니에요", origin: "일본어 e(絵, 그림) + moji(文字, 문자)가 합쳐진 말이에요. 영어 emotion과 비슷한 건 우연이랍니다.",
    example: "She ended the message with a smile emoji.", translation: "그녀는 미소 이모지로 메시지를 끝냈어.", image: art(26, "emoji"), imageAlt: "종이 등불 속에서 웃음과 별, 꽃 그림 문자가 튀어나오는 장면"
  },
  {
    day: 27, word: "vaccine", pronunciation: "/ˈvæk.siːn/", meaning: "백신", description: "질병을 예방하도록 면역 반응을 일으키는 물질",
    originTitle: "백신의 이름 속에는 암소가 있어요", origin: "라틴어 vacca는 '암소'예요. 에드워드 제너가 우두에 걸린 사람이 천연두에 강하다는 사실을 활용해 예방접종을 발전시킨 데서 나왔죠.",
    example: "The vaccine protects against the disease.", translation: "그 백신은 질병으로부터 보호해 줘.", image: art(27, "vaccine"), imageAlt: "꽃밭에서 투명한 방패를 함께 든 소와 의사"
  },
  {
    day: 28, word: "universe", pronunciation: "/ˈjuː.nɪ.vɜːs/", meaning: "우주", description: "시간과 공간, 모든 물질과 에너지의 전체",
    originTitle: "우주는 '하나로 돌아간 모든 것'이에요", origin: "라틴어 unus(하나) + vertere(돌리다)가 합쳐진 universus에서 왔어요. 서로 다른 모든 것이 하나의 전체를 이룬다는 이미지예요.",
    example: "The universe is full of unanswered questions.", translation: "우주는 아직 답하지 못한 질문으로 가득해.", image: art(28, "universe"), imageAlt: "수많은 별과 행성이 하나의 빛나는 원으로 회전하는 우주"
  },
  {
    day: 29, word: "courage", pronunciation: "/ˈkʌr.ɪdʒ/", meaning: "용기", description: "두렵거나 힘든 상황에서도 맞서는 마음",
    originTitle: "용기는 머리가 아니라 심장에서 나왔어요", origin: "옛 프랑스어 corage와 라틴어 cor는 '심장'을 뜻해요. 중세에는 사람의 감정과 기질이 심장에 담겨 있다고 생각했거든요.",
    example: "It took courage to speak the truth.", translation: "진실을 말하는 데는 용기가 필요했어.", image: art(29, "courage"), imageAlt: "작은 탐험가가 빛나는 심장 등불을 들고 어두운 다리를 건너는 장면"
  },
  {
    day: 30, word: "happiness", pronunciation: "/ˈhæp.i.nəs/", meaning: "행복", description: "즐거움과 만족을 느끼는 상태",
    originTitle: "행복은 우연히 찾아온 행운에서 시작했어요", origin: "옛 노르스어 hap은 '행운, 우연한 일'을 뜻했어요. happen, perhaps에도 같은 뿌리가 남아 있어요. 좋은 운을 만난 상태가 happiness가 된 거죠.",
    example: "Small routines can bring great happiness.", translation: "작은 습관이 큰 행복을 가져올 수 있어.", image: art(30, "happiness"), imageAlt: "작은 행운의 조각들을 모아 큰 해를 만드는 사람들"
  },
  {
    day: 31, word: "gratitude", pronunciation: "/ˈɡræt.ɪ.tjuːd/", meaning: "감사", description: "받은 친절과 도움을 고맙게 여기는 마음",
    originTitle: "감사와 은혜, 즐거움은 한 가족이에요", origin: "라틴어 gratus는 '고마운, 기분 좋은'을 뜻해요. grace, grateful, congratulate도 같은 뿌리 가족이에요.",
    example: "She wrote a note of gratitude to her teacher.", translation: "그녀는 선생님께 감사의 편지를 썼어.", image: art(31, "gratitude"), imageAlt: "한 달의 여행 기록을 별이 반짝이는 편지로 나누는 친구들"
  }
];

export function getDefaultAugustDay(now = new Date()) {
  if (now.getFullYear() === 2026 && now.getMonth() === 7) return now.getDate();
  if (now < new Date(2026, 7, 1)) return 1;
  return 31;
}

export const MONTH_WORDS: Record<number, DailyWord[]> = {
  8: applyVocabularyUpgrades(AUGUST_WORDS.map((item) => ({ ...item, month: 8 }))),
  9: applyVocabularyUpgrades(SEPTEMBER_WORDS),
  10: applyVocabularyUpgrades(OCTOBER_WORDS),
  11: applyVocabularyUpgrades(NOVEMBER_WORDS),
  12: applyVocabularyUpgrades(DECEMBER_WORDS),
};

export const MONTH_NAMES: Record<number, string> = {
  8: "8월", 9: "9월", 10: "10월", 11: "11월", 12: "12월",
};

export function getDefaultDate(now = new Date()) {
  if (now.getFullYear() === 2026 && now.getMonth() >= 7 && now.getMonth() <= 11) {
    const month = now.getMonth() + 1;
    return { month, day: Math.min(now.getDate(), MONTH_WORDS[month].length) };
  }
  if (now < new Date(2026, 7, 1)) return { month: 8, day: 1 };
  return { month: 12, day: 31 };
}

export function getWordBySavedAt(savedAt: string) {
  const [, monthText, dayText] = savedAt.split(".");
  const month = Number(monthText);
  const day = Number(dayText);
  return MONTH_WORDS[month]?.[day - 1];
}
