import axios from 'axios';
import React from 'react';
import useSWR from 'swr';
import { useSnackbar } from '@/components/commons/feedback/SnackbarContext';

export const useEnglishWordPracPrintList = ({
  handlePrintProp,
}: {
  /**
   * 印刷する関数（本hookがhandlePrintを使用するため、呼び出し用）
   */
  handlePrintProp: () => void;
}) => {
  const { addMessageObject } = useSnackbar();

  const fetcher = (key: string) => axios.get(key).then((res) => res.data);

  const { data, error, isLoading } = useSWR('/api/v2/prints', fetcher, {
    // 自動fetchの無効化
    revalidateIfStale: false,
    revalidateOnFocus: false,
    revalidateOnReconnect: false,
  });

  const prints: IEnglishWordPracPrint[] = data?.prints ?? [];

  const [selectedPrint, setSelectedPrint] =
    React.useState<IEnglishWordPracPrint>();

  /**
   * 印刷を実行
   */
  const handlePrint = (id: string) => {
    const newSelectedPrint = prints.find((print) => print.id === id);
    if (!newSelectedPrint) return;
    setSelectedPrint(newSelectedPrint);
    setTimeout(() => {
      handlePrintProp(); // 本来の印刷関数を呼び出す（setTimeoutにすることで印刷レイアウト完了を待つ）
    });
  };

  /**
   * 印刷アーカイブ（単体）削除
   */
  const handleDelete = (id: string) => {
    axios
      .delete(`/api/v2/prints/${id}`)
      .then(() => addMessageObject('削除が完了しました。', 'success'))
      .catch((e) =>
        addMessageObject(`削除時にエラーが発生しました${e}`, 'error')
      );
  };

  if (error) {
    // eslint-disable-next-line
    console.error(error.message);
  }
  return { prints, isLoading, selectedPrint, handlePrint, handleDelete };
};
