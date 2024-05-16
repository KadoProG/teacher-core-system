import { useMediaQuery } from '@mui/material';
import { useForm } from 'react-hook-form';

/**
 * セッションの検索をするためのフック
 */
export const useEnglishWordPracWordSessionDialog = (
  sessions: IEnglishWordPracSession[]
) => {
  const { control, watch } = useForm<{ search: string }>({
    defaultValues: {
      search: '',
    },
  });

  const searchValue = watch('search');

  const isMin600 = useMediaQuery('(min-width:600px)');
  const isMin800 = useMediaQuery('(min-width:800px)');

  const chunkSize = isMin800 ? 10 : isMin600 ? 15 : 1000;

  // セッションの文字列を検索するための値を作成
  const sessionValues = sessions.map((session) => ({
    value: String(session.row).padStart(2, '0') + session.title,
    id: session.id,
  }));

  // 検索値に一致するセッションを取得
  const filteredSessions = sessionValues.filter((session) =>
    session.value.includes(searchValue)
  );

  // 正しいセッション情報を取得
  const resultSessions = filteredSessions.map(
    (session) =>
      sessions.find((s) => s.id === session.id) as IEnglishWordPracSession
  );

  // セッションをチャンクに分割
  const slicedSessions = resultSessions.reduce((acc: any, _, index) => {
    if (index % chunkSize === 0) {
      acc.push(resultSessions.slice(index, index + chunkSize));
    }
    return acc;
  }, []) as IEnglishWordPracSession[][];

  return {
    /** フォームコントローラー */
    control,
    /** 分割されたSessions */
    slicedSessions,
  };
};
