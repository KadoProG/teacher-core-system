import React from 'react';
import { useDropzone } from 'react-dropzone';
import useSWR from 'swr';
import { useConfirmDialog } from '@/components/commons/feedback/ConfirmDialogContext';
import { useSnackbar } from '@/components/commons/feedback/SnackbarContext';
import { useAuth } from '@/libs/firebase/FirebaseAuthContext';
import { exportSessionToExcel } from '@/utils/excel/exportSessionToExcel';
import { importSessionFromExcel } from '@/utils/excel/importSessionFromExcel';
import {
  deleteAllEnglishWordPracSession,
  fetchEnglishWordPracSession,
  saveEnglishWordPracSession,
} from '@/utils/fetch/fetchEnglishWordPrac';

export const useEnglishWordPracSession = () => {
  const { selectedTeamId } = useAuth();
  const { confirmDialog } = useConfirmDialog();
  const { addMessageObject } = useSnackbar();

  const [isOpenDialog, setIsOpenDialog] = React.useState<boolean>(false);
  const handleCloseDialog = () => setIsOpenDialog(false);
  const handleOpenDialog = () => setIsOpenDialog(true);

  const { data, error, isLoading, isValidating, mutate } = useSWR(
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

  const handleSessionsDelete = React.useCallback(async () => {
    const { isAccepted } = await confirmDialog({
      title: '削除の確認',
      children: 'セッションを削除します。よろしいですか？',
      negativeButtonText: 'いいえ',
      positiveButtonText: 'はい',
    });
    if (!isAccepted) return;
    try {
      await deleteAllEnglishWordPracSession(selectedTeamId);
      addMessageObject('セッションの削除が完了しました', 'success');
      mutate();
    } catch (e) {
      addMessageObject(`単語の削除に失敗しました：${e}`, 'error');
    }
  }, [mutate, addMessageObject, confirmDialog, selectedTeamId]);

  const onDropFile = React.useCallback(
    async (acceptedFiles: File[]) => {
      try {
        const sessions = await importSessionFromExcel(acceptedFiles[0]);

        // firestoreにデータを上書き
        await saveEnglishWordPracSession(sessions, selectedTeamId).catch(
          (e) => {
            throw new Error(
              `セッションデータのアップロードに失敗しました：${e}`
            );
          }
        );
        addMessageObject(
          'セッションデータのアップロードが完了しました',
          'success'
        );
        handleCloseDialog();
        mutate();
      } catch (error: any) {
        addMessageObject(error.message, 'error');
      }
    },
    [mutate, addMessageObject, selectedTeamId]
  );

  const dropzone = useDropzone({
    onDrop: onDropFile,
  });

  React.useEffect(() => {
    mutate();
  }, [mutate, selectedTeamId]);

  const sessions: IEnglishWordPracSession[] = React.useMemo(
    () => data?.sessions ?? [],
    [data?.sessions]
  );

  const handleExportExcelData = React.useCallback(async () => {
    try {
      await exportSessionToExcel(sessions);
      addMessageObject('Excelのエクスポートが完了しました。', 'success');
    } catch (e: any) {
      addMessageObject(
        'Excelのエクスポートに失敗しました。' + e.message,
        'error'
      );
    }
  }, [addMessageObject, sessions]);

  if (error) {
    console.error(error.message); // eslint-disable-line
  }

  const isDisabledDeleteButton = sessions.length === 0 || isLoadingSessions;

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
    isLoadingSessions,
    /**削除ボタンの無効化 */
    isDisabledDeleteButton,
    /**ドロップダイアログの表示、非表示 */
    dropDialog: {
      isOpen: isOpenDialog,
      handleCloseDialog,
      handleOpenDialog,
    },
  };
};
