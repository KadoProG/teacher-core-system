export const useEnglishWordPracPrintList = () => {
  // const fetcher = (key: string) => axios.get(key).then((res) => res.data);

  // const { data, error } = useSWR('/api/english/word_prac/prints', fetcher, {
  //   // 自動fetchの無効化
  //   revalidateIfStale: false,
  //   revalidateOnFocus: false,
  //   revalidateOnReconnect: false,
  // });

  const data = { prints: [] };
  const prints: IEnglishWordPracPrint[] = data?.prints ?? [];

  return { prints };
};
