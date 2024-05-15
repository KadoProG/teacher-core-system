import React from 'react';
import { useDropzone } from 'react-dropzone';
import useSWR, { mutate } from 'swr';
import { useConfirmDialog } from '@/components/commons/feedback/ConfirmDialogContext';
import { useSnackbar } from '@/components/commons/feedback/SnackbarContext';
import { getWorksheetsFromExcelFile } from '@/utils/dropExcelData';
import { processSessionExcelData } from '@/utils/excel/processSessionExcelData';
import { exportExcelData } from '@/utils/exportExcelData';
import {
  deleteAllEnglishWordPracSession,
  fetchEnglishWordPracSession,
  saveEnglishWordPracSession,
} from '@/utils/fetch/fetchEnglishWordPrac';

export const useEnglishWordPracSession = () => {
  const { confirmDialog } = useConfirmDialog();
  const { addMessageObject } = useSnackbar();

  const [isOpenDialog, setIsOpenDialog] = React.useState<boolean>(false);
  const handleCloseDialog = () => setIsOpenDialog(false);
  const handleOpenDialog = () => setIsOpenDialog(true);

  const handleSessionsDelete = React.useCallback(async () => {
    const { isAccepted } = await confirmDialog({
      title: '削除の確認',
      children: 'セッションを削除します。よろしいですか？',
      negativeButtonText: 'いいえ',
      positiveButtonText: 'はい',
    });
    if (!isAccepted) return;
    try {
      await deleteAllEnglishWordPracSession();
      addMessageObject('セッションの削除が完了しました', 'success');
      mutate('sessions');
    } catch (e) {
      addMessageObject(`単語の削除に失敗しました：${e}`, 'error');
    }
  }, [addMessageObject, confirmDialog]);

  const onDropFile = React.useCallback(
    async (acceptedFiles: File[]) => {
      try {
        // ファイル→Sheetを取得
        const worksheets = await getWorksheetsFromExcelFile(acceptedFiles, [
          'セッションマスタ',
          '単語マスタ',
        ]);
        //  Sheet→Sessionsを取得
        const sessions = await processSessionExcelData(
          worksheets[0], // セッションマスタ
          worksheets[1] // 単語マスタ
        );
        // firestoreにデータを上書き
        await saveEnglishWordPracSession(sessions).catch((e) => {
          throw new Error(`セッションデータのアップロードに失敗しました：${e}`);
        });
        handleCloseDialog();
        mutate('sessions');
      } catch (error: any) {
        addMessageObject(error.message, 'error');
      }
    },
    [addMessageObject]
  );

  const dropzone = useDropzone({
    onDrop: onDropFile,
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
    console.error(error.message); // eslint-disable-line
  }

  const sessions: IEnglishWordPracSession[] = data?.sessions ?? [];

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
      handleCloseDialog,
      handleOpenDialog,
    },
  };
};
