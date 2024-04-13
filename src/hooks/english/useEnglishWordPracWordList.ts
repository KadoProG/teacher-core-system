import axios from 'axios';
import exceljs from 'exceljs';
import React from 'react';
import { useDropzone } from 'react-dropzone';
import useSWR, { mutate } from 'swr';
import { useSnackbar } from '@/components/commons/feedback/SnackbarContext';
import { dropExcelData } from '@/utils/dropExcelData';
import { convertCellToString } from '@/utils/excelUtils';

export const useEnglishWordPracWordList = () => {
  const { addMessageObject } = useSnackbar();
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
        await dropExcelData(acceptedFiles, '単語マスタ', processWordExcelData);
      } catch (e: any) {
        addMessageObject(e.message, 'error');
      }
    },
  });

  const fetcher = (key: string) => axios.get(key).then((res) => res.data);

  const handleWordsDelete = async () => {
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
    selectedSessionId ? `/api/v2/words?session_id=${selectedSessionId}` : null,
    fetcher,
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
  } = useSWR('/api/v2/sessions', fetcher, {
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

  // Excelファイルを処理する関数
  const processWordExcelData = React.useCallback(
    async (worksheet: exceljs.Worksheet) => {
      const words: {
        row: number;
        session_id: string;
        en_title: string;
        jp_title: string;
        study_year: string;
      }[] = [];

      for (let i = 2; i < 1000; i++) {
        const row: exceljs.Row = worksheet.getRow(i);
        const id = row.getCell(1).value as number;
        const sessionStringValue = row.getCell(2).value; // セッション
        const enTitleValue = row.getCell(3).value; // 英語
        const jpTitleValue = row.getCell(4).value; // 日本語
        const studyYear = row.getCell(5).value; // 履修学年

        try {
          if (id && sessionStringValue && enTitleValue && jpTitleValue) {
            const sessionString = convertCellToString(sessionStringValue);
            const session_id = sessions.find(
              (session) =>
                `${String(session.row).padStart(2, '0')}　${session.title}` ===
                sessionString
            )?.id;
            if (!session_id) throw new Error('存在しないSessionです');
            const en_title = convertCellToString(enTitleValue);
            const jp_title = convertCellToString(jpTitleValue);
            const study_year = convertCellToString(studyYear);
            words.push({
              row: id,
              session_id,
              en_title,
              jp_title,
              study_year,
            });
          }
        } catch (e) {
          addMessageObject(`${i}行目付近にエラーがありました：${e}`, 'error');
        }
      }
      await uploadWords(words);
    },
    [sessions, uploadWords, addMessageObject]
  );

  return {
    /**
     * セッションデータ
     */
    sessions,
    /**
     * セッションデータLoading中…
     */
    isLoadingSessions,
    /**
     * Wordデータ
     */
    words,
    /**
     * WordデータLoading中…
     */
    isLoadingWords: isLoadingSessions || isLoadingWords,
    /**
     * ドロップゾーンのオブジェクト
     */
    dropzone,
    /**
     * ドロップダイアログの表示、非表示
     */
    dropDialog: {
      isOpen: isOpenDialog,
      handleClose,
      handleOpen,
    },
    /**
     * 単語の削除を実行
     */
    handleWordsDelete,
    /**
     * セッションの選択
     */
    onSelectedSession,
    /**
     * 選択中のセッションID
     */
    selectedSessionId,
  };
};
