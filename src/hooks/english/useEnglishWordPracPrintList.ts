import axios from 'axios';
import useSWR from 'swr';

export const useEnglishWordPracPrintList = () => {
  const fetcher = (key: string) => axios.get(key).then((res) => res.data);

  const { data, error } = useSWR('/api/english/word_prac/prints', fetcher, {
    // 自動fetchの無効化
    revalidateIfStale: false,
    revalidateOnFocus: false,
    revalidateOnReconnect: false,
  });

  const prints: EnglishWordPracPrint[] = data?.prints ?? [];

  if (error) {
    // eslint-disable-next-line
    console.error(error.message);
  }
  return { prints };
};
