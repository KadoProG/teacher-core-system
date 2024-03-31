import axios from 'axios';
import exceljs from 'exceljs';
import React from 'react';
import { useDropzone } from 'react-dropzone';
import { useSnackbar } from '@/components/commons/feedback/SnackbarContext';
import { dropExcelData } from '@/utils/dropExcelData';
import { convertCellToString } from '@/utils/excelUtils';

export const useEnglishWordPracSession = () => {
  const [sessions, setSessions] = React.useState<IEnglishWordPracSession[]>([]);
  const [isOpenDialog, setIsOpenDialog] = React.useState<boolean>(false);

  const handleClose = () => {
    setIsOpenDialog(false);
  };
  const handleOpen = () => {
    setIsOpenDialog(true);
  };

  const { addMessageObject } = useSnackbar();

  const dropzone = useDropzone({
    onDrop: async (acceptedFiles) => {
      try {
        await dropExcelData(
          acceptedFiles,
          '単語マスタ',
          processSessionExcelData
        );
      } catch (e: any) {
        addMessageObject(e.message, 'error');
      }
    },
  });

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

  const uploadSessions = async (sessions: { row: number; title: string }[]) => {
    try {
      await axios.put('/api/english/word_prac/sessions', { sessions });
      setIsOpenDialog(false);
      addMessageObject(
        'セッションデータのアップロードが完了しました。',
        'success'
      );
      fetchSessions();
    } catch (error) {
      addMessageObject(
        `セッションデータのアップロードに失敗しました：${error}`,
        'error'
      );
    }
  };
  // セッションExcelファイルを処理する関数
  const processSessionExcelData = async (worksheet: exceljs.Worksheet) => {
    const sessions: { row: number; title: string }[] = [];

    for (let i = 2; i < 1000; i++) {
      const row: exceljs.Row = worksheet.getRow(i);
      const id = row.getCell(1).value as number;
      const titleValue = row.getCell(2).value;

      if (id && titleValue) {
        const title = convertCellToString(titleValue);
        sessions.push({ row: id, title });
      }
    }

    await uploadSessions(sessions);
  };

  return {
    /**
     * セッションデータ
     */
    sessions,
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
    processSessionExcelData,
  };
};
