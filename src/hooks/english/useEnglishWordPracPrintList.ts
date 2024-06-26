import React from 'react';
import { useDropzone } from 'react-dropzone';
import { useForm } from 'react-hook-form';
import { mutate } from 'swr';
import { useSnackbar } from '@/components/commons/feedback/SnackbarContext';
import { useAuth } from '@/libs/firebase/FirebaseAuthContext';
import { exportPrintArchiveToExcel } from '@/utils/excel/exportPrintArchiveToExcel';
import { importPrintArchiveFromExcel } from '@/utils/excel/importPrintArchivesFromExcel';
import {
  deleteEnglishWordPracPrint,
  fetchEnglishWordPracPrintArchives,
  saveEnglishWordPracPrintArchives,
} from '@/utils/fetch/fetchPrintArchive';

export const useEnglishWordPracPrintList = ({
  handlePrintProp,
}: {
  /** 印刷する関数（本hookがhandlePrintを使用するため、呼び出し用） */
  handlePrintProp: () => void;
}) => {
  const { selectedTeamId } = useAuth();
  const { addMessageObject } = useSnackbar();
  const { control, watch } = useForm<{ is_show_answer: boolean }>({
    defaultValues: { is_show_answer: false },
  });

  const [isLoading, setIsLoading] = React.useState<boolean>(true);

  const [printArchives, setPrintArchives] = React.useState<
    IEnglishWordPracPrint[]
  >([]);

  React.useEffect(() => {
    if (!selectedTeamId) return;
    const fetchPrintArchives = async () => {
      setIsLoading(true);
      const data = await fetchEnglishWordPracPrintArchives(selectedTeamId);
      setPrintArchives(data.prints);
      setIsLoading(false);
    };
    fetchPrintArchives();
  }, [selectedTeamId]);

  const [isOpenDialog, setIsOpenDialog] = React.useState<boolean>(false);
  const handleCloseDialog = () => setIsOpenDialog(false);
  const handleOpenDialog = () => setIsOpenDialog(true);

  const onDropFile = React.useCallback(
    async (acceptedFiles: File[]) => {
      try {
        const prints = await importPrintArchiveFromExcel(acceptedFiles[0]);
        await saveEnglishWordPracPrintArchives(prints, selectedTeamId, true);
        addMessageObject('インポートが完了しました。', 'success');
        mutate(selectedTeamId);
        handleCloseDialog();
      } catch (e) {
        addMessageObject(`インポート時にエラーが発生しました：${e}`, 'error');
      }
    },
    [addMessageObject, selectedTeamId]
  );

  const dropzone = useDropzone({
    onDrop: onDropFile,
  });

  const isShowAnswer = watch('is_show_answer');

  const [selectedPrint, setSelectedPrint] =
    React.useState<IEnglishWordPracPrint>();

  const handlePrint = React.useCallback(
    (id: string) => {
      const newSelectedPrint = printArchives.find((print) => print.id === id);
      if (!newSelectedPrint) return;
      newSelectedPrint.isShowAnswer = isShowAnswer;
      setSelectedPrint(newSelectedPrint);

      setTimeout(() => {
        handlePrintProp(); // 本来の印刷関数を呼び出す（setTimeoutにすることで印刷レイアウト完了を待つ）
      });
    },
    [handlePrintProp, printArchives, isShowAnswer]
  );

  const handleExport = React.useCallback(async () => {
    try {
      await exportPrintArchiveToExcel(printArchives);
      addMessageObject('エクスポートが完了しました。', 'success');
    } catch (e) {
      addMessageObject(`エクスポート時にエラーが発生しました：${e}`, 'error');
    }
  }, [printArchives, addMessageObject]);

  const handleDelete = React.useCallback(
    async (id: string) => {
      try {
        await deleteEnglishWordPracPrint(id, selectedTeamId);
        addMessageObject('削除が完了しました。', 'success');
        mutate(selectedTeamId);
      } catch (e) {
        addMessageObject(`削除時にエラーが発生しました${e}`, 'error');
      }
    },
    [addMessageObject, selectedTeamId]
  );

  return {
    /**プリントデータ */
    prints: printArchives,
    /**ドロップゾーンの設定 */
    dropzone,
    /**ローディング中か */
    isLoading,
    /**選択中のプリントデータ */
    selectedPrint,
    /**プリント処理 */
    handlePrint,
    /**プリント削除 */
    handleDelete,
    /**エクセルエクスポート */
    handleExport,
    control,
    /**ドロップダイアログの表示、非表示 */
    dropDialog: {
      isOpen: isOpenDialog,
      handleCloseDialog,
      handleOpenDialog,
    },
  };
};
