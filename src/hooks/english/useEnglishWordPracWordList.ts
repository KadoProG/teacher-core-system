import React from 'react';
import useSWR, { mutate } from 'swr';
import { useConfirmDialog } from '@/components/commons/feedback/ConfirmDialogContext';
import { useSnackbar } from '@/components/commons/feedback/SnackbarContext';
import {
  deleteAllEnglishWordPracWordList,
  fetchEnglishWordPracSession,
} from '@/utils/fetch/fetchEnglishWordPrac';

export const useEnglishWordPracWordList = () => {
  const { addMessageObject } = useSnackbar();
  const { confirmDialog } = useConfirmDialog();
  const [selectedSession, setSelectedSession] = React.useState<
    IEnglishWordPracSession & { index: number }
  >();

  const handleWordsDelete = async () => {
    const { isAccepted } = await confirmDialog({
      title: '削除の確認',
      negativeButtonText: 'いいえ',
      positiveButtonText: 'はい',
      children: '本当に削除してよろしいですか？',
    });

    if (!isAccepted) return;
    try {
      await deleteAllEnglishWordPracWordList();
      addMessageObject('単語の削除が完了しました', 'success');
      mutate('sessions');
    } catch (e) {
      addMessageObject(`単語の削除に失敗しました：${e}`, 'error');
    }
  };

  const {
    data,
    error,
    isLoading: isLoadingSessions,
  } = useSWR('sessions', fetchEnglishWordPracSession, {
    // 自動fetchの無効化
    revalidateIfStale: false,
    revalidateOnFocus: false,
    revalidateOnReconnect: false,
  });

  const sessions: IEnglishWordPracSession[] = React.useMemo(
    () => data?.sessions ?? [],
    [data?.sessions]
  );

  React.useEffect(() => {
    if (sessions.length !== 0 && !selectedSession) {
      setSelectedSession({ ...sessions[0], index: 0 });
      return;
    }
  }, [sessions, selectedSession]);

  React.useEffect(() => {
    if (sessions.length === 0) return;

    setSelectedSession({ ...sessions[0], index: 0 });
  }, [sessions]);

  // セッションの切り替え
  const onSelectSession = (id: IEnglishWordPracSession['id']) => {
    const index = sessions.findIndex((session) => session.id === id);
    setSelectedSession({ ...sessions[index], index });
  };

  if (error) {
    // eslint-disable-next-line
    console.error(error);
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
    /**単語の削除を実行 */
    handleWordsDelete,
    /**セッションの選択 */
    onSelectSession,
  };
};
