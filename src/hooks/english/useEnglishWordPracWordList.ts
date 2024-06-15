import React from 'react';
import useSWR, { mutate } from 'swr';
import { useAuth } from '@/libs/firebase/FirebaseAuthContext';
import { fetchEnglishWordPracSession } from '@/utils/fetch/fetchEnglishWordPrac';

export const useEnglishWordPracWordList = () => {
  const { selectedTeamId } = useAuth();
  const [selectedSession, setSelectedSession] = React.useState<
    IEnglishWordPracSession & { index: number }
  >();

  const { data, error, isLoading, isValidating } = useSWR(
    selectedTeamId,
    async () => fetchEnglishWordPracSession(selectedTeamId),
    {
      // 自動fetchの無効化
      revalidateIfStale: false,
      revalidateOnFocus: false,
      revalidateOnReconnect: false,
    }
  );
  const isLoadingSessions = isLoading || isValidating;

  // チームIDが変更されたら再fetch
  React.useEffect(() => {
    mutate(selectedTeamId);
  }, [selectedTeamId]);

  const sessions: IEnglishWordPracSession[] = React.useMemo(
    () => data?.sessions ?? [],
    [data?.sessions]
  );

  React.useEffect(() => {
    if (sessions.length > 0 && !selectedSession) {
      setSelectedSession({ ...sessions[0], index: 0 });
    } else if (sessions.length === 0) {
      setSelectedSession(undefined);
    }
  }, [sessions, selectedSession]);

  // セッションの切り替え
  const onSelectSession = React.useCallback(
    (id: IEnglishWordPracSession['id']) => {
      const index = sessions.findIndex((session) => session.id === id);
      setSelectedSession({ ...sessions[index], index });
    },
    [sessions]
  );

  if (error) {
    console.error(error.message); // eslint-disable-line
  }

  return {
    /**全てのSessionデータ */
    sessions,
    /**セッションデータLoading中… */
    isLoadingSessions: isLoadingSessions || !data?.sessions,
    /**選択中のSessionデータ */
    selectedSession,
    /**WordデータLoading中… */
    isLoadingWords: isLoadingSessions || !data?.sessions,
    /**セッションの選択 */
    onSelectSession,
  };
};
