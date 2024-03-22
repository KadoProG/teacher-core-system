import React from 'react';

export const useEnglishWordPracSession = () => {
  const [sessions, setSessions] = React.useState<IEnglishWordPracSession[]>([]);

  const fetchSessions = async () => {
    const response = await fetch('/api/english/word_prac/sessions', {
      method: 'GET',
    });
    const { sessions } = await response.json();
    setSessions(sessions);
  };

  React.useEffect(() => {
    fetchSessions();
  }, []);

  return {
    /**
     * セッションデータ
     */
    sessions,
  };
};
