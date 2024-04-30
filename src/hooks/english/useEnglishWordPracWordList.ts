import React from 'react';
import { useDropzone } from 'react-dropzone';
import useSWR, { mutate } from 'swr';
import { useConfirmDialog } from '@/components/commons/feedback/ConfirmDialogContext';
import { useSnackbar } from '@/components/commons/feedback/SnackbarContext';
import { dropExcelData } from '@/utils/dropExcelData';
import { processWordExcelData } from '@/utils/excel/processWordExcelData';
import {
  deleteAllEnglishWordPracWordList,
  fetchEnglishWordPracSession,
  saveEnglishWordPracWordList,
} from '@/utils/fetch/fetchEnglishWordPrac';

export const useEnglishWordPracWordList = () => {
  const { addMessageObject } = useSnackbar();
  const { confirmDialog } = useConfirmDialog();
  const [isOpenDialog, setIsOpenDialog] = React.useState<boolean>(false);
  const [selectedSession, setSelectedSession] =
    React.useState<IEnglishWordPracSession>();

  const handleClose = () => {
    setIsOpenDialog(false);
  };
  const handleOpen = () => {
    setIsOpenDialog(true);
  };

  const dropzone = useDropzone({
    onDrop: async (acceptedFiles) => {
      try {
        await dropExcelData(acceptedFiles, '単語マスタ', async (workbook) => {
          // 添付されたWordデータの処理とアップロード
          const preWords = await processWordExcelData(workbook, sessions);
          const newWords: IEnglishWordPracWord[] = preWords.map((word) => ({
            row: word.row,
            session_id: word.session_id,
            jp_title: word.jp_title,
            en_title: word.en_title,
            created_at: new Date(),
            updated_at: new Date(),
            study_year: word.study_year,
            memo: '',
          }));

          await saveEnglishWordPracWordList(newWords);

          addMessageObject('アップロードが完了しました', 'success');
          setIsOpenDialog(false);
          mutate(
            (key) => typeof key === 'string' && key.startsWith('/api/v2/words'),
            undefined,
            { revalidate: true }
          );
        });
      } catch (e: any) {
        addMessageObject(e.message, 'error');
      }
    },
  });

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
      mutate(
        (key) => typeof key === 'string' && key.startsWith('/api/v2/words'),
        undefined,
        { revalidate: true }
      );
    } catch (e) {
      addMessageObject(`単語の削除に失敗しました：${e}`, 'error');
    }
  };

  const {
    data: dataSessions,
    error: errorSessions,
    isLoading: isLoadingSessions,
  } = useSWR('sessions', fetchEnglishWordPracSession, {
    // 自動fetchの無効化
    revalidateIfStale: false,
    revalidateOnFocus: false,
    revalidateOnReconnect: false,
  });

  const sessions: IEnglishWordPracSession[] = React.useMemo(
    () => dataSessions?.sessions ?? [],
    [dataSessions?.sessions]
  );

  if (sessions.length !== 0 && !selectedSession) {
    setSelectedSession(sessions[0]);
  }

  // セッションの切り替え
  const onSelectedSession = (id: IEnglishWordPracSession['id']) => {
    setSelectedSession(sessions.find((session) => session.id === id));
  };

  if (errorSessions) {
    // eslint-disable-next-line
    console.error(errorSessions);
  }

  return {
    /**全てのSessionデータ */
    sessions,
    /**セッションデータLoading中… */
    isLoadingSessions,
    /**選択中のSessionデータ */
    selectedSession,
    /**WordデータLoading中… */
    isLoadingWords: isLoadingSessions,
    /**ドロップゾーンのオブジェクト */
    dropzone,
    /**ドロップダイアログの表示、非表示 */
    dropDialog: {
      isOpen: isOpenDialog,
      handleClose,
      handleOpen,
    },
    /**単語の削除を実行 */
    handleWordsDelete,
    /**セッションの選択 */
    onSelectedSession,
  };
};
