import React from 'react';
import { useForm } from 'react-hook-form';
import useSWR, { mutate } from 'swr';
import { useSnackbar } from '@/components/commons/feedback/SnackbarContext';
import {
  deleteEnglishWordPracPrint,
  fetchEnglishWordPracPrint,
} from '@/utils/fetch/fetchEnglishWordPrac';

export const useEnglishWordPracPrintList = ({
  handlePrintProp,
}: {
  /** 印刷する関数（本hookがhandlePrintを使用するため、呼び出し用） */
  handlePrintProp: () => void;
}) => {
  const { addMessageObject } = useSnackbar();
  const { control, watch } = useForm<{ is_show_answer: boolean }>({
    defaultValues: { is_show_answer: false },
  });

  const isShowAnswer = watch('is_show_answer');

  const { data, error, isLoading } = useSWR(
    'prints',
    fetchEnglishWordPracPrint,
    {
      // 自動fetchの無効化
      revalidateIfStale: false,
      revalidateOnFocus: false,
      revalidateOnReconnect: false,
    }
  );

  const prints: IEnglishWordPracPrint[] = React.useMemo(
    () =>
      data?.prints.map((print) => ({
        ...print,
        isShowAnswer,
      })) ?? [],
    [data?.prints, isShowAnswer]
  );

  const [selectedPrint, setSelectedPrint] =
    React.useState<IEnglishWordPracPrint>();

  const handlePrint = React.useCallback(
    (id: string) => {
      const newSelectedPrint = prints.find((print) => print.id === id);
      if (!newSelectedPrint) return;
      newSelectedPrint.isShowAnswer = isShowAnswer;
      setSelectedPrint(newSelectedPrint);

      setTimeout(() => {
        handlePrintProp(); // 本来の印刷関数を呼び出す（setTimeoutにすることで印刷レイアウト完了を待つ）
      });
    },
    [handlePrintProp, prints, isShowAnswer]
  );

  const handleDelete = React.useCallback(
    async (id: string) => {
      try {
        await deleteEnglishWordPracPrint(id);
        addMessageObject('削除が完了しました。', 'success');
        mutate('prints');
      } catch (e) {
        addMessageObject(`削除時にエラーが発生しました${e}`, 'error');
      }
    },
    [addMessageObject]
  );

  if (error) {
    console.error(error.message); // eslint-disable-line
  }

  return {
    /**プリントデータ */
    prints,
    /**ローディング中か */
    isLoading,
    /**選択中のプリントデータ */
    selectedPrint,
    /**プリント処理 */
    handlePrint,
    /**プリント削除 */
    handleDelete,
    control,
  };
};
