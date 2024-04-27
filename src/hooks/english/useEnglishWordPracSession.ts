import axios from 'axios';
import exceljs from 'exceljs';
import React from 'react';
import { useDropzone } from 'react-dropzone';
import useSWR, { mutate } from 'swr';
import { useConfirmDialog } from '@/components/commons/feedback/ConfirmDialogContext';
import { useSnackbar } from '@/components/commons/feedback/SnackbarContext';
import { dropExcelData } from '@/utils/dropExcelData';
import { convertCellToString } from '@/utils/excelUtils';
import { exportExcelData } from '@/utils/exportExcelData';
import { fetchEnglishWordPracSession } from '@/utils/fetch/fetchEnglishWordPrac';

export const useEnglishWordPracSession = () => {
  const { confirmDialog } = useConfirmDialog();
  const [isOpenDialog, setIsOpenDialog] = React.useState<boolean>(false);

  const handleClose = () => {
    setIsOpenDialog(false);
  };
  const handleOpen = () => {
    setIsOpenDialog(true);
  };

  /**
   * セッションの削除を実行
   */
  const handleSessionsDelete = async () => {
    const { isAccepted } = await confirmDialog({
      title: '削除の確認',
      children: 'セッションを削除します。よろしいですか？',
      negativeButtonText: 'いいえ',
      positiveButtonText: 'はい',
    });
    if (!isAccepted) return;
    try {
      await axios.delete('/api/v2/sessions');
      addMessageObject('セッションの削除が完了しました', 'success');
      mutate('sessions');
    } catch (e) {
      addMessageObject(`単語の削除に失敗しました：${e}`, 'error');
    }
  };

  const { addMessageObject } = useSnackbar();

  const dropzone = useDropzone({
    onDrop: async (acceptedFiles) => {
      try {
        await dropExcelData(
          acceptedFiles,
          'セッションマスタ',
          processSessionExcelData
        );
      } catch (e: any) {
        addMessageObject(e.message, 'error');
      }
    },
  });

  const handleExportExcelData = async () => {
    try {
      await exportExcelData();
      addMessageObject('Excelのエクスポートが完了しました。', 'success');
    } catch (e: any) {
      addMessageObject(
        'Excelのエクスポートに失敗しました。' + e.message,
        'error'
      );
    }
  };

  const { data, error, isLoading } = useSWR(
    'sessions',
    fetchEnglishWordPracSession,
    {
      // 自動fetchの無効化
      revalidateIfStale: false,
      revalidateOnFocus: false,
      revalidateOnReconnect: false,
    }
  );

  if (error) {
    // eslint-disable-next-line
    console.error(error.message);
  }

  const sessions: IEnglishWordPracSession[] = data?.sessions ?? [];

  const uploadSessions = async (sessions: { row: number; title: string }[]) => {
    try {
      await axios.put('/api/v2/sessions', { sessions });
      setIsOpenDialog(false);
      addMessageObject(
        'セッションデータのアップロードが完了しました。',
        'success'
      );
      mutate('sessions');
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

    for (let i = 2; i < 101; i++) {
      const row: exceljs.Row = worksheet.getRow(i);
      const idValue = row.getCell(1).value as string;
      const titleValue = row.getCell(2).value;

      if (idValue && titleValue) {
        const title = convertCellToString(titleValue);
        sessions.push({ row: parseInt(idValue), title });
      }
    }

    await uploadSessions(sessions);
  };

  return {
    /**セッションデータ */
    sessions,
    /**ドロップゾーンのオブジェクト */
    dropzone,
    /**セッションの削除を実行 */
    handleSessionsDelete,
    /**Excelのエクスポート */
    handleExportExcelData,
    /**ローディング中か */
    isLoading,
    /**ドロップダイアログの表示、非表示 */
    dropDialog: {
      isOpen: isOpenDialog,
      handleClose,
      handleOpen,
    },
  };
};
