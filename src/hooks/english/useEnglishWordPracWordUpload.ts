import React from 'react';
import { useDropzone } from 'react-dropzone';
import { mutate } from 'swr';
import { useSnackbar } from '@/components/commons/feedback/SnackbarContext';
import { dropExcelData } from '@/utils/dropExcelData';
import { processWordExcelData } from '@/utils/excel/processWordExcelData';
import { saveEnglishWordPracWordList } from '@/utils/fetch/fetchEnglishWordPrac';

/**
 * 単語ページでの印刷設定や、保存処理
 */
export const useEnglishWordPracWordUpload = (option: {
  sessions: IEnglishWordPracSession[];
}) => {
  const { addMessageObject } = useSnackbar();
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
        await dropExcelData(acceptedFiles, '単語マスタ', async (workbook) => {
          // 添付されたWordデータの処理とアップロード
          const preWords = await processWordExcelData(
            workbook,
            option.sessions
          );
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
          mutate('sessions');
        });
      } catch (e: any) {
        addMessageObject(e.message, 'error');
      }
    },
  });

  return {
    /**ドロップゾーンのオブジェクト */
    dropzone,
    /**ドロップダイアログの表示、非表示 */
    dropDialog: {
      isOpen: isOpenDialog,
      handleClose,
      handleOpen,
    },
  };
};
