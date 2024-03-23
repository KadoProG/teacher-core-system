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
