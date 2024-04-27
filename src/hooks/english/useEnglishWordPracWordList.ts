import axios from 'axios';
import React from 'react';
import { useDropzone } from 'react-dropzone';
import useSWR, { mutate } from 'swr';
import { useConfirmDialog } from '@/components/commons/feedback/ConfirmDialogContext';
import { useSnackbar } from '@/components/commons/feedback/SnackbarContext';
import { dropExcelData } from '@/utils/dropExcelData';
import { processWordExcelData } from '@/utils/excel/processWordExcelData';
import {
  fetchEnglishWordPracSession,
  fetchEnglishWordPracWordList,
} from '@/utils/fetch/fetchEnglishWordPrac';

export const useEnglishWordPracWordList = () => {
  const { addMessageObject } = useSnackbar();
  const { confirmDialog } = useConfirmDialog();
  const [isOpenDialog, setIsOpenDialog] = React.useState<boolean>(false);
  // 選択中のSession
  const [selectedSessionId, setSelectedSessionId] =
    React.useState<IEnglishWordPracSession['id']>();

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
          const words = await processWordExcelData(workbook, sessions);
          await uploadWords(words);
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
      await axios.delete('/api/v2/words');
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
    data,
    error,
    isLoading: isLoadingWords,
  } = useSWR(
    selectedSessionId ? selectedSessionId : null,
    fetchEnglishWordPracWordList,
    {
      // 自動fetchの無効化
      revalidateIfStale: false,
      revalidateOnFocus: false,
      revalidateOnReconnect: false,
    }
  );
  const words: IEnglishWordPracWord[] = data?.words ?? [];

  if (error) {
    // eslint-disable-next-line
    console.error(error.message);
  }

  const {
    data: dataSessions,
    error: errorSessions,
    isLoading: isLoadingSessions,
  } = useSWR('/api/v2/sessions', fetchEnglishWordPracSession, {
    // 自動fetchの無効化
    revalidateIfStale: false,
    revalidateOnFocus: false,
    revalidateOnReconnect: false,
  });

  const sessions: IEnglishWordPracSession[] = React.useMemo(
    () => dataSessions?.sessions ?? [],
    [dataSessions?.sessions]
  );

  if (sessions.length !== 0 && !selectedSessionId) {
    setSelectedSessionId(sessions[0].id);
  }

  if (errorSessions) {
    // eslint-disable-next-line
    console.error(errorSessions);
  }

  // セッションの切り替え
  const onSelectedSession = (id: IEnglishWordPracSession['id']) => {
    setSelectedSessionId(id);
  };

  const uploadWords = React.useCallback(
    async (
      words: {
        row: number;
        session_id: string;
        en_title: string;
        jp_title: string;
        study_year: string;
      }[]
    ) => {
      try {
        await axios.put('/api/v2/words', { words });
        addMessageObject('アップロードが完了しました', 'success');
        setIsOpenDialog(false);
        mutate(
          (key) => typeof key === 'string' && key.startsWith('/api/v2/words'),
          undefined,
          { revalidate: true }
        );
      } catch (error) {
        addMessageObject(
          `Wordデータのアップロードに失敗しました：${error}`,
          'error'
        );
      }
    },
    [addMessageObject]
  );

  return {
    /**セッションデータ */
    sessions,
    /**セッションデータLoading中… */
    isLoadingSessions,
    /**Wordデータ */
    words,
    /**WordデータLoading中… */
    isLoadingWords: isLoadingSessions || isLoadingWords,
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
    /**選択中のセッションID */
    selectedSessionId,
  };
};
