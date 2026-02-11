import React from 'react';
import { AdmissionPath, ImportantDate, StudentCategory } from './types';
import { BookOpen, Award, Users, PenTool, GraduationCap, Star, TrendingUp, Cpu, Calendar, ClipboardCheck, Search, Lightbulb, Target, Sparkles } from 'lucide-react';

// TODO: 請在此處填入您的 Google Apps Script 部署網址 (Web App URL)
// 例如: "https://script.google.com/macros/s/......./exec"
export const LOGGING_API_URL = "https://script.google.com/macros/s/AKfycbwqw4JzUApQ1jHG5csiIccEWJiwvBorg4VZeydabKtPqH5fN-TIhOtY5jhfthgb_vAx/exec"; 

export const CATEGORIES: { id: StudentCategory; label: string; description: string }[] = [
  { id: 'high_school', label: '普通高中', description: '學測 / 繁星 / 申請 / 分科' },
  { id: 'vocational', label: '技術型高中', description: '統測 / 甄選 / 登記分發' },
  { id: 'junior_college', label: '五專生', description: '二技 / 插大轉學考' },
];

// Keywords mapping to filter dates based on selected paths
export const PATH_KEYWORDS: Record<string, string[]> = {
  // High School
  'individual': ['學測', '英聽', '申請', '面試', '篩選', '備審'],
  'star': ['學測', '英聽', '繁星'],
  'placement': ['學測', '分科', '分發', '志願'],
  'tech_apply': ['學測', '四技申請', '四技二階'],
  'special': ['特殊選才'],
  
  // Vocational
  'tech_special': ['特殊選才'],
  'selection': ['統測', '甄選', '備審'],
  'registration': ['統測', '登記分發', '分發', '志願'],
  'tech_star': ['繁星'],
  'tech_excellence': ['技優'],
  
  // Junior College
  'two_year_college': ['二技'],
  'transfer': ['轉學', '插大']
};

export const ADMISSION_PATHS: Record<StudentCategory, AdmissionPath[]> = {
  high_school: [
    {
      id: 'individual',
      title: '大學個人申請',
      icon: <Users className="w-6 h-6 text-indigo-500" />,
      description: '目前最主要的升學管道，採計學測成績與綜合學習歷程。',
      details: [
        '第一階段：學測成績篩選 (倍率篩選)',
        '第二階段：指定項目甄試 (面試、筆試、實作)',
        '需上傳學習歷程檔案 (P)',
        '每人最多申請 6 個一般大學校系'
      ],
      suitability: '學測成績中上、具多元表現、清楚志向者',
      pros: [
        '名額最多，錄取機會大',
        '重視多元表現，不只看考試成績',
        '可同時申請 6 個志願，分散風險'
      ],
      cons: [
        '備審資料與面試準備耗時',
        '二階甄試需奔波各校，花費較高',
        '若落榜需等到七月分科測驗'
      ],
      percentage: '約 50-60%',
      link: 'https://www.cac.edu.tw/',
    },
    {
      id: 'star',
      title: '繁星推薦',
      icon: <Star className="w-6 h-6 text-amber-500" />,
      description: '根據在校成績排名與學測成績進行推薦，免面試 (醫學系除外)。',
      details: [
        '在校學業成績全校排名 (前20%~50%)',
        '學測成績需達檢定標準',
        '分發錄取後不得參加申請入學',
        '第8類學群 (醫學/牙醫) 需第二階段面試'
      ],
      suitability: '校排名前段、在校成績穩定優異者',
      pros: [
        '最早放榜，提早成為準大學生',
        '1-7類學群免面試、免備審',
        '私校或偏鄉學生有機會進入頂大'
      ],
      cons: [
        '在校成績需維持三年，壓力大',
        '一輪分發每校僅能推薦一人，校內競爭',
        '錄取後不得放棄 (除非放棄後參加分科)'
      ],
      percentage: '約 15%',
      link: 'https://www.cac.edu.tw/',
    },
    {
      id: 'tech_apply',
      title: '四技申請入學',
      icon: <Cpu className="w-6 h-6 text-teal-500" />,
      description: '高中生憑「學測成績」申請科技大學，不需考統測。',
      details: [
        '採計學測成績 (國、英、數、社/自)',
        '第一階段：學測成績加權篩選',
        '第二階段：複試 (面試/實作) 及備審資料',
        '每人最多申請 5 個校系 (不佔大學個人申請名額)'
      ],
      suitability: '想往實務應用發展、喜歡科大環境的高中生',
      pros: [
        '多出 5 個志願機會 (與一般大學分開計算)',
        '提早進入職場導向的學習環境',
        '部分科大排名優於中後段普大'
      ],
      cons: [
        '高中課程與科大專業銜接需適應',
        '名額相對較少，熱門科系競爭激烈',
        '同儕多為高職生，實作基礎可能有落差'
      ],
      percentage: '獨立名額',
      link: 'https://www.jctv.ntut.edu.tw/caac/',
    },
    {
      id: 'placement',
      title: '分發入學',
      icon: <TrendingUp className="w-6 h-6 text-rose-500" />,
      description: '採計「學測 + 分科測驗」成績，完全看分數分發。',
      details: [
        '無面試、無備審資料',
        '採計組合多元 (例如：國(學測) + 數甲(分科) + 物(分科))',
        '可選填 100 個志願',
      ],
      suitability: '擅長考試、不善面試或申請失利者',
      pros: [
        '一試定勝負，完全公平客觀',
        '不需製作學習歷程檔案',
        '志願數多 (100個)，落榜機率低'
      ],
      cons: [
        '考試壓力延續至七月，身心煎熬',
        '名額受前面管道回流影響，不確定性高',
        '部分科系可能不採計分科，需注意簡章'
      ],
      percentage: '約 20-30%',
      link: 'https://www.uac.edu.tw/',
    },
    {
      id: 'special',
      title: '特殊選才',
      icon: <Award className="w-6 h-6 text-purple-500" />,
      description: '不採計學測成績，針對具特殊才能、經歷或弱勢學生。',
      details: [
        '無需學測成績',
        '重視書面審查與面試',
        '適合具特殊專長 (如程式、競賽) 的學生',
      ],
      suitability: '具特殊專長或競賽優異者',
      pros: [
        '完全不看學測成績，發揮專長即可',
        '最早確認錄取 (約 12-1 月)',
        '適合偏科嚴重但在特定領域強的學生'
      ],
      cons: [
        '名額極少 (約 1-2%)，競爭極激烈',
        '準備資料繁瑣，標準主觀',
        '需有具體且強大的獎項佐證'
      ],
      percentage: '約 1-2%',
      link: 'https://srecruit.moe.edu.tw/',
    },
  ],
  vocational: [
    {
      id: 'tech_special',
      title: '科技校院特殊選才',
      icon: <Sparkles className="w-6 h-6 text-pink-500" />,
      description: '不採計統測成績，針對具特殊經歷、專長、弱勢或不同教育資歷學生。',
      details: [
        '需符合特定報名資格 (如技能優異、特殊經歷)',
        '最多可報名 5 個校系科(組)',
        '採計書面審查與指定項目甄審 (面試/實作)'
      ],
      suitability: '具特殊專長、技能優異或不同教育資歷者',
      pros: [
        '不需統測成績，減輕學科壓力',
        '提早於 2 月放榜，最早確認學校',
        '重視實務能力與特殊表現'
      ],
      cons: [
        '名額稀少，競爭激烈',
        '資格審查嚴格',
        '需花費時間準備備審與面試'
      ],
      percentage: '約 1-2%',
      link: 'https://www.jctv.ntut.edu.tw/enter42/s42/',
    },
    {
      id: 'selection',
      title: '甄選入學',
      icon: <Target className="w-6 h-6 text-indigo-500" />,
      description: '高職生最主要管道，採計統測成績與備審資料。',
      details: [
        '第一階段：統測成績篩選',
        '第二階段：指定項目甄試 (面試、實作)',
        '最多申請 6 個校系'
      ],
      suitability: '統測成績中上、具備審資料者',
      pros: [
        '名額佔比最高，主力升學管道',
        '可展現證照、實作等多元優勢',
        '有機會透過備審彌補學科分數'
      ],
      cons: [
        '僅能報名 6 個志願，選擇較少',
        '需準備備審資料與面試',
        '期程較長'
      ],
      percentage: '約 50-60%',
      link: 'https://www.jctv.ntut.edu.tw/enter42/',
    },
    {
      id: 'registration',
      title: '聯合登記分發',
      icon: <TrendingUp className="w-6 h-6 text-rose-500" />,
      description: '完全看統測成績，依分數高低分發，一試定終身。',
      details: [
        '採計統測成績 x 權重',
        '無面試、無備審',
        '可選填 199 個志願'
      ],
      suitability: '學科/專業科目考試成績高者',
      pros: [
        '單純看分數，規則簡單明確',
        '不需準備備審資料',
        '志願數極多 (199個)，不易落榜'
      ],
      cons: [
        '無法展現非考試的才華',
        '名額逐年減少 (被甄選入學瓜分)',
        '一試定終身，失常風險大'
      ],
      percentage: '約 30-40%',
      link: 'https://www.jctv.ntut.edu.tw/union42/',
    },
    {
      id: 'tech_star',
      title: '科技繁星',
      icon: <Star className="w-6 h-6 text-amber-500" />,
      description: '由學校推薦，不採計統測成績，重視在校排名。',
      details: [
        '每校推薦人數有限制',
        '依比序排名分發 (學業成績、競賽、證照)',
        '適合校排前段且不想考統測的學生'
      ],
      suitability: '在校成績極優異者',
      pros: [
        '免考統測 (或僅作門檻)',
        '提早錄取',
        '優質國立科大名額保留給繁星'
      ],
      cons: [
        '校內競爭激烈，名額極少',
        '在校成績需維持三年前段',
        '志願選填限制較多'
      ],
      percentage: '名額極少',
      link: 'https://www.jctv.ntut.edu.tw/star/',
    },
    {
      id: 'tech_excellence',
      title: '技優保送/甄審',
      icon: <Award className="w-6 h-6 text-purple-500" />,
      description: '憑藉技藝競賽得獎或乙級以上證照入學。',
      details: [
        '保送：國際技能競賽、全國金手獎前三名',
        '甄審：乙級證照、各類競賽優勝',
        '不採計統測成績 (甄審僅作門檻)',
      ],
      suitability: '實作能力強、有證照/競賽成績者',
      pros: [
        '完全發揮實作專長',
        '不需和一般生拚學科成績',
        '保送管道錄取國立機率極高'
      ],
      cons: [
        '需花費大量時間訓練選手或考照',
        '甄審仍有名額限制與競爭',
        '基礎學科能力可能較弱，入學後需補強'
      ],
      percentage: '視科系而定',
      link: 'https://www.jctv.ntut.edu.tw/enter42/skill/',
    },
  ],
  junior_college: [
    {
      id: 'two_year_college',
      title: '二技申請入學',
      icon: <GraduationCap className="w-6 h-6 text-indigo-500" />,
      description: '五專畢業後銜接二年制技術學院。',
      details: [
        '主要採計二技統測成績',
        '部分學校採計書面審查',
        '畢業後取得學士學位'
      ],
      suitability: '想繼續在技職體系深造者',
      pros: [
        '課程銜接較順暢',
        '取得完整學士學歷',
        '準備方向明確 (二技統測)'
      ],
      cons: [
        '二技學校數量逐年減少',
        '熱門護理/藥學類科競爭激烈',
        '選擇性較插大少'
      ],
      percentage: '主要管道',
      link: 'https://www.jctv.ntut.edu.tw/enter/',
    },
    {
      id: 'transfer',
      title: '大學轉學考 (插大)',
      icon: <BookOpen className="w-6 h-6 text-emerald-500" />,
      description: '報考一般大學大二或大三轉學考試。',
      details: [
        '各校獨立招生或聯合招生',
        '考科通常為國、英及專業科目',
        '難度較高，競爭激烈'
      ],
      suitability: '想轉換跑道至普通大學者',
      pros: [
        '可進入一般大學體系',
        '有機會進入頂尖大學',
        '轉換科系的機會'
      ],
      cons: [
        '名額極少 (視缺額而定)',
        '考試難度高，準備辛苦',
        '學分抵免問題可能導致延畢'
      ],
      percentage: '視學校缺額'
    }
  ]
};

// 115 Academic Year Detailed Schedule
export const IMPORTANT_DATES: ImportantDate[] = [
  // --- High School Exams ---
  {
    date: '114/08/05',
    title: '大考中心簡章發售',
    description: '115學年度高中英聽、學測、分科測驗簡章發售。',
    category: ['high_school'],
    isHighlight: false,
  },
  {
    date: '114/09/04 - 09/11',
    title: '英聽(一) 報名',
    description: '高中英語聽力測驗第一次考試報名。',
    category: ['high_school'],
    isHighlight: false,
  },
  {
    date: '114/10/18',
    title: '英聽(一) 考試',
    description: '高中英語聽力測驗第一次考試日 (週六)。',
    category: ['high_school'],
    isHighlight: true,
  },
  {
    date: '114/10/28 - 11/11',
    title: '學測報名',
    description: '115學年度學科能力測驗報名 (請留意學校集報時間)。',
    category: ['high_school'],
    isHighlight: true,
  },
  {
    date: '114/11/04',
    title: '繁星/申請簡章公告',
    description: '115學年度繁星推薦與大學申請入學招生簡章公告。',
    category: ['high_school'],
    isHighlight: false,
  },
  {
    date: '114/11/05 - 11/11',
    title: '英聽(二) 報名',
    description: '高中英語聽力測驗第二次考試報名。',
    category: ['high_school'],
    isHighlight: false,
  },
  {
    date: '114/12/04',
    title: '四技申請簡章公告',
    description: '115學年度科技校院申請入學簡章網路公告。',
    category: ['high_school'],
    isHighlight: false,
  },
  {
    date: '114/12/13',
    title: '英聽(二) 考試',
    description: '高中英語聽力測驗第二次考試日 (週六)。',
    category: ['high_school'],
    isHighlight: false,
  },
  {
    date: '115/01/17 - 01/19',
    title: '學科能力測驗 (學測)',
    description: '115學年度學測考試，考科包含國、英、數A/B、社、自。',
    category: ['high_school'],
    isHighlight: true,
  },
  {
    date: '115/02/25',
    title: '學測成績公佈',
    description: '大考中心公佈成績及五標。',
    category: ['high_school'],
    isHighlight: true,
  },
  
  // --- University Application (High School) ---
  {
    date: '115/03/11 - 03/12',
    title: '繁星推薦報名',
    description: '高中學校向甄選委員會辦理繁星報名 (含繳費)。',
    category: ['high_school'],
    isHighlight: true,
  },
  {
    date: '115/03/18',
    title: '繁星放榜 (1-7類)',
    description: '公告第1-7類錄取名單及第8類(醫牙)一階篩選結果。',
    category: ['high_school'],
    isHighlight: true,
  },
  {
    date: '115/03/19 - 03/25',
    title: '四技申請報名',
    description: '四技申請入學個別報名 (3/19-3/24繳費)。',
    category: ['high_school'],
    isHighlight: false,
  },
  {
    date: '115/03/23 - 03/25',
    title: '大學申請報名',
    description: '115學年度大學申請入學報名。',
    category: ['high_school'],
    isHighlight: true,
  },
  {
    date: '115/03/31',
    title: '一階篩選結果',
    description: '大學申請入學及四技申請入學一階篩選結果公告。',
    category: ['high_school'],
    isHighlight: true,
  },
  {
    date: '115/04/30 - 05/06',
    title: '二階上傳審查資料',
    description: '大學及四技申請入學第二階段網路上傳(勾選)審查資料。',
    category: ['high_school'],
    isHighlight: true,
  },
  {
    date: '115/05/14 - 05/26',
    title: '四技二階複試',
    description: '四技各校自訂面試、實作等複試項目。',
    category: ['high_school'],
    isHighlight: false,
  },
  {
    date: '115/05/14 - 05/31',
    title: '大學二階/繁星面試',
    description: '大學申請入學指定項目甄試及繁星第8類二階面試。',
    category: ['high_school'],
    isHighlight: true,
  },
  {
    date: '115/05/29',
    title: '四技申請放榜',
    description: '四技申請入學錄取名單公告。',
    category: ['high_school'],
    isHighlight: false,
  },
  {
    date: '115/06/03',
    title: '繁星第8類放榜',
    description: '上午 9 點公告繁星推薦第8類學群錄取結果。',
    category: ['high_school'],
    isHighlight: true,
  },
  {
    date: '115/06/04',
    title: '大學申請登記志願',
    description: '大學申請入學錄取生登記就讀志願序。',
    category: ['high_school'],
    isHighlight: true,
  },
  {
    date: '115/06/11',
    title: '大學申請統一分發',
    description: '大學申請入學統一分發結果公告。',
    category: ['high_school'],
    isHighlight: true,
  },

  // --- Vocational Dates ---
  {
    date: '114/11/20',
    title: '科技校院特殊選才簡章',
    description: '115學年度科技校院特殊選才入學招生簡章公告。',
    category: ['vocational'],
    isHighlight: false,
  },
  {
    date: '114/11/20',
    title: '科技繁星簡章公告',
    description: '115學年度科技校院繁星計畫招生簡章公告。',
    category: ['vocational'],
    isHighlight: false,
  },
  {
    date: '114/12/04',
    title: '聯合登記分發簡章',
    description: '115學年度聯合登記分發簡章公告。',
    category: ['vocational'],
    isHighlight: false,
  },
  {
    date: '114/12/05 - 12/17',
    title: '統測報名',
    description: '115學年度四技二專統一入學測驗報名。',
    category: ['vocational'],
    isHighlight: true,
  },
  {
    date: '114/12/15 - 12/19',
    title: '科技校院特殊選才報名',
    description: '繳費至12/18止。需上網登錄資料、繳費並上傳資格審查文件。',
    category: ['vocational'],
    isHighlight: true,
  },
  {
    date: '115/01/08',
    title: '特殊選才資格審查結果',
    description: '上午 10:00 起公告資格審查結果 (1/9 中午前複查)。',
    category: ['vocational'],
    isHighlight: false,
  },
  {
    date: '115/01/12 - 01/16',
    title: '特殊選才二階繳費上傳',
    description: '向各招生學校繳交指定項目甄審費及網路上傳備審資料。',
    category: ['vocational'],
    isHighlight: false,
  },
  {
    date: '115/01/23 - 01/31',
    title: '特殊選才指定項目甄審',
    description: '各招生學校辦理面試、實作等指定項目甄審。',
    category: ['vocational'],
    isHighlight: true,
  },
  {
    date: '115/02/02',
    title: '特殊選才甄審總成績',
    description: '上午 10:00 起查詢甄審總成績 (2/3 中午前複查)。',
    category: ['vocational'],
    isHighlight: false,
  },
  {
    date: '115/02/04',
    title: '各校公告甄審結果',
    description: '上午 10:00 起各招生學校公告甄審結果 (2/5 中午前複查)。',
    category: ['vocational'],
    isHighlight: false,
  },
  {
    date: '115/02/04 - 02/06',
    title: '特殊選才登記志願',
    description: '正備取生至委員會網站登記就讀志願序 (至2/6 17:00止)。',
    category: ['vocational'],
    isHighlight: true,
  },
  {
    date: '115/02/11',
    title: '特殊選才分發放榜',
    description: '上午 10:00 公告就讀志願序統一分發結果。',
    category: ['vocational'],
    isHighlight: true,
  },
  {
    date: '115/03/03',
    title: '特殊選才報到截止',
    description: '依各校規定辦理報到 (12:00前)，或聲明放棄錄取資格。',
    category: ['vocational'],
    isHighlight: false,
  },
  {
    date: '115/03/11 - 03/18',
    title: '科技繁星報名',
    description: '被推薦考生進行網路報名 (學校於3/19前寄件)。',
    category: ['vocational'],
    isHighlight: true,
  },
  {
    date: '115/04/07',
    title: '科技繁星成績審查',
    description: '公告考生報名資格及比序成績審查結果。',
    category: ['vocational'],
    isHighlight: false,
  },
  {
    date: '115/04/14',
    title: '科技繁星排名查詢',
    description: '考生比序排名網路查詢 (4/15 中午前複查)。',
    category: ['vocational'],
    isHighlight: true,
  },
  {
    date: '115/04/22 - 04/28',
    title: '科技繁星選填志願',
    description: '考生網路選填登記就讀志願序 (至28日 17:00 止)。',
    category: ['vocational'],
    isHighlight: true,
  },
  {
    date: '115/04/25 - 04/26',
    title: '統一入學測驗 (統測)',
    description: '115學年度四技二專統測考試 (週六、週日)。',
    category: ['vocational'],
    isHighlight: true,
  },
  {
    date: '115/05/05',
    title: '科技繁星放榜',
    description: '上午 10:00 公告統一分發錄取名單。',
    category: ['vocational'],
    isHighlight: true,
  },
  {
    date: '115/05/12',
    title: '科技繁星放棄截止',
    description: '中午 12:00 前聲明放棄錄取資格截止。',
    category: ['vocational'],
    isHighlight: false,
  },
  {
    date: '115/05/14',
    title: '統測成績公告',
    description: '下午 14:00 起開放成績查詢。',
    category: ['vocational'],
    isHighlight: true,
  },
  {
    date: '115/05/14 - 06/03',
    title: '分發資格審查',
    description: '聯合登記分發個別資格、特種生、低收身分審查登錄。',
    category: ['vocational'],
    isHighlight: false,
  },
  {
    date: '115/05/15 - 05/22',
    title: '甄選入學一階報名',
    description: '四技二專甄選入學第一階段報名。',
    category: ['vocational'],
    isHighlight: false,
  },
  {
    date: '115/06/05 - 06/12',
    title: '甄選入學二階報名',
    description: '第二階段繳費及上傳學習歷程備審資料。',
    category: ['vocational'],
    isHighlight: true,
  },
  {
    date: '115/07/14',
    title: '甄選入學分發放榜',
    description: '公告就讀志願序統一分發結果。',
    category: ['vocational'],
    isHighlight: true,
  },
  {
    date: '115/07/17 - 07/22',
    title: '聯合登記分發繳費',
    description: '四技二專聯合登記分發個別繳費。',
    category: ['vocational'],
    isHighlight: true,
  },
  {
    date: '115/07/28 - 07/31',
    title: '聯合登記分發志願',
    description: '考生網路選填登記志願 (至31日 17:00 止)。',
    category: ['vocational'],
    isHighlight: true,
  },
  {
    date: '115/08/06',
    title: '聯合登記分發放榜',
    description: '上午 10:00 起公告分發錄取結果。',
    category: ['vocational'],
    isHighlight: true,
  },

  // --- High School Department Test (115 分科測驗 & 分發入學) ---
  {
    date: '115/06/03 - 06/16',
    title: '分科測驗報名',
    description: '115學年度分科測驗報名 (至 6/16 下午 5 點)。',
    category: ['high_school'],
    isHighlight: false,
  },
  {
    date: '115/07/07',
    title: '應考資訊與考場查詢',
    description: '上午 9 點起開放查詢分科測驗考場。',
    category: ['high_school'],
    isHighlight: false,
  },
  {
    date: '115/07/11 - 07/12',
    title: '分科測驗考試',
    description: '指定科目考試 (不考國英乙)。',
    category: ['high_school'],
    isHighlight: true,
  },
  {
    date: '115/07/29',
    title: '分科測驗放榜',
    description: '上午 9 點公佈成績及五標，並開放成績複查 (至 8/3)。',
    category: ['high_school'],
    isHighlight: true,
  },
  {
    date: '115/07/29 - 08/04',
    title: '分發入學繳費',
    description: '分發入學登記費繳交 (至 8/4 中午 12 點止)。',
    category: ['high_school'],
    isHighlight: false,
  },
  {
    date: '115/08/01 - 08/04',
    title: '登記選填志願',
    description: '網路登記分發志願 (至 8/4 下午 4 點 30 分止)。',
    category: ['high_school'],
    isHighlight: true,
  },
  {
    date: '115/08/13',
    title: '大學分發放榜',
    description: '上午 9 點公告大學分發入學錄取結果 (8/15 截止下載)。',
    category: ['high_school'],
    isHighlight: true,
  },
];
