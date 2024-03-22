import React from 'react';

export const useEnglishWordPrac = () => {
  const [sessions, setSessions] = React.useState<IEnglishWordPracSession[]>([]);
  const [words, setWords] = React.useState<IEnglishWordPracWord[]>([]);

  const [selectedSession, setSelectedSession] =
    React.useState<IEnglishWordPracSession>();

  const fetchSessions = async () => {
    const response = await fetch('/api/english/word_prac/sessions', {
      method: 'GET',
    });
    const { sessions } = await response.json();
    setSessions(sessions);
    setSelectedSession(sessions[0] ?? undefined);
  };

  // const fetchWords = async () => {
  //   const response = await fetch('/api/english/word_prac/words', {
  //     method: 'GET',
  //   });
  //   const { words } = await response.json();
  //   setWords(words);
  // };

  React.useEffect(() => {
    fetchSessions();
  }, []);

  React.useEffect(() => {
    const wordListData: IEnglishWordPracWord[] = [
      {
        id: 'aaa',
        session_id: '1',
        row: '1',
        jp_title: '変数',
        en_title: 'variable',
        study_year: '中学1',
        memo: '',
        created_at: '2024-03-17T22:24:10.852Z' as unknown as Date,
        updated_at: '2024-03-17T22:24:10.852Z' as unknown as Date,
      },
      {
        id: 'aab',
        session_id: '1',
        row: '999',
        jp_title: '～によって・～のそばに・～までに・～によって',
        en_title: 'seventeen / seventeenth',
        study_year: '中1 ~中3',
        memo: '今日は今回はタイピング練習をしていこうと思います',
        created_at: '2024-03-17T22:24:10.852Z' as unknown as Date,
        updated_at: '2024-03-17T22:24:10.852Z' as unknown as Date,
      },
    ];
    setWords(wordListData);
    // fetchWords();
  }, [selectedSession]);

  return {
    /**
     * セッションデータ
     */
    sessions,
    /**
     * Wordデータ
     */
    words,
  };
};
