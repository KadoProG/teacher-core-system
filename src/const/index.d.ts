interface IEnglishWordPracWord {
  id: number;
  session_id: number;
  row: number;
  jp_title: string;
  en_title: string;
  study_year: string;
  memo: string;
  created_at: Date;
  updated_at: Date;
}

interface IEnglishWordPracSession {
  id: number;
  title: string;
  row: number;
  memo: string;
  created_at: Date;
  updated_at: Date;
}

interface IEnglishWordPracPrint {
  id: number;
  title: string;
  words: { en_title: string; jp_title: string; type: 'en' | 'jp' }[];
  isShowAnswer?: boolean;
  created_at?: Date;
  updated_at?: Date;
}
