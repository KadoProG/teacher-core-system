import axios from 'axios';
import exceljs from 'exceljs';
import React from 'react';
import { useDropzone } from 'react-dropzone';
import { useSnackbar } from '@/components/commons/feedback/SnackbarContext';
import { dropExcelData } from '@/utils/dropExcelData';
import { convertCellToString } from '@/utils/excelUtils';

export const useEnglishWordPrac = () => {
  const { addMessageObject } = useSnackbar();
  const [sessions, setSessions] = React.useState<IEnglishWordPracSession[]>([]);
  const [words, setWords] = React.useState<IEnglishWordPracWord[]>([]);
  const [isOpenDialog, setIsOpenDialog] = React.useState<boolean>(false);

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

  // 選択中のSession
  const [selectedSessionId, setSelectedSessionId] =
    React.useState<IEnglishWordPracSession['id']>();

  // Word取得の関数
  const fetchWords = React.useCallback(async (sessionId: number) => {
    const response = await fetch(
      `/api/english/word_prac/words?session_id=${sessionId}`,
      {
        method: 'GET',
      }
    );
    const { words } = await response.json();
    setWords(words);
  }, []);

  // セッション取得の関数
  const fetchSessions = React.useCallback(async () => {
    const response = await fetch('/api/english/word_prac/sessions', {
      method: 'GET',
    });
    const { sessions } = await response.json();
    setSessions(sessions);
    sessions.length !== 0 && fetchWords(sessions[0].id);
    setSelectedSessionId(sessions[0].id ?? undefined);
  }, [fetchWords]);

  // 起動時に実行
  React.useEffect(() => {
    fetchSessions();
  }, [fetchSessions]);

  // セッションの切り替え
  const onSelectedSession = (id: IEnglishWordPracSession['id']) => {
    setSelectedSessionId(id);
    fetchWords(id);
  };

  const uploadWords = React.useCallback(
    async (
      words: {
        row: number;
        session_id: number;
        en_title: string;
        jp_title: string;
        study_year: string;
      }[]
    ) => {
      try {
        await axios.put('/api/english/word_prac/words', { words });
        addMessageObject('アップロードが完了しました', 'success');
        setIsOpenDialog(false);
        selectedSessionId && fetchWords(selectedSessionId);
      } catch (error) {
        addMessageObject(
          `Wordデータのアップロードに失敗しました：${error}`,
          'error'
        );
      }
    },
    [fetchWords, selectedSessionId, addMessageObject]
  );

  // Excelファイルを処理する関数
  const processWordExcelData = React.useCallback(
    async (worksheet: exceljs.Worksheet) => {
      const words: {
        row: number;
        session_id: number;
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
                `${String(session.id).padStart(2, '0')}　${session.title}` ===
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
     * Wordデータ
     */
    words,
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
     * Excelデータアップロード（ワーク取得成功）時の処理
     */
    processWordExcelData,
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
