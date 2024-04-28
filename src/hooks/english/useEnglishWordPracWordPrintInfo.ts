import React from 'react';
import { useForm } from 'react-hook-form';
import { mutate } from 'swr';
import { useSnackbar } from '@/components/commons/feedback/SnackbarContext';
import { usePrinting } from '@/hooks/commons/usePrinting';
import { useEnglishWordPracWordList } from '@/hooks/english/useEnglishWordPracWordList';
import { useAuth } from '@/libs/firebase/FirebaseAuthContext';
import { convertToRomanNumeral } from '@/utils/convertToRomanNumeral';
import { saveEnglishWordPracPrint } from '@/utils/fetch/fetchEnglishWordPrac';

/**
 * 単語ページでの印刷設定や、保存処理
 */
export const useEnglishWordPracWordPrintInfo = (
  englishWordPrac: ReturnType<typeof useEnglishWordPracWordList>
) => {
  const user = useAuth();
  const componentRef = React.useRef<HTMLDivElement>(null);
  const [isShowAnswer, setIsShowAnswer] = React.useState<boolean>(false);
  const { handlePrint: handleHookPrint } = usePrinting({ componentRef });
  const { addMessageObject } = useSnackbar();
  const form = useForm<{
    is_randam_jp_en: boolean; // 英語・日本語の出題をランダムにする
    is_randam_word: boolean; // 単語をランダムに出題する
    word_count: number; // 最大出題数
  }>({
    defaultValues: {
      is_randam_jp_en: false,
      is_randam_word: false,
      word_count: 15,
    },
  });

  // セッション情報→タイトルの設定
  const session = englishWordPrac.sessions.find(
    (session) => englishWordPrac.selectedSessionId === session.id
  );
  const sessionTitle = `アイプロ${convertToRomanNumeral(
    Math.floor(((session?.row ?? 1) - 1) / 10) + 1
  )}　level${String(session?.row).padStart(2, '0')}「${session?.title}」`;

  // 単語データの設定（form条件に準ずる）
  const wordPracListBefore: IEnglishWordPracPrint['words'] =
    englishWordPrac.words.map((word) => {
      let type: IEnglishWordPracPrint['words'][number]['type'] = 'en';
      // 英語・日本語の出題をランダムにする を付与
      if (form.watch('is_randam_jp_en'))
        type = Math.round(Math.random()) ? 'en' : 'jp';

      return { ...word, type };
    });
  if (form.watch('is_randam_word')) {
    // シャッフルするロジック（Fisher-Yatesアルゴリズム）
    for (let i = wordPracListBefore.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [wordPracListBefore[i], wordPracListBefore[j]] = [
        wordPracListBefore[j],
        wordPracListBefore[i],
      ];
    }
  }

  const wordPracList = wordPracListBefore.slice(0, form.watch('word_count'));

  // 現在生成中の印刷データ
  const print: IEnglishWordPracPrint = React.useMemo(
    () => ({
      title: sessionTitle,
      words: wordPracList,
      isShowAnswer,
      email: user?.name ?? '',
      created_at: new Date(),
      updated_at: new Date(),
    }),
    [sessionTitle, wordPracList, isShowAnswer, user?.name]
  );

  // 印刷データを保存する処理
  const handleSave = React.useCallback(async () => {
    await saveEnglishWordPracPrint(print)
      .then(() => {
        addMessageObject('印刷アーカイブの保存が完了しました。', 'success');
        mutate(
          (key) => typeof key === 'string' && key.startsWith('/api/v2/prints'),
          undefined,
          { revalidate: true }
        );
      })
      .catch((e) => addMessageObject(`保存に失敗しました。${e}`, 'error'));
  }, [addMessageObject, print]);

  const handlePrint = React.useCallback(
    async (currentIsShowAnswer?: boolean) => {
      await handleSave();
      setIsShowAnswer(currentIsShowAnswer ?? false);
      setTimeout(() => {
        handleHookPrint();
      });
    },
    [handleHookPrint, handleSave]
  );

  return {
    /**
     * 印刷条件のフォーム
     */
    form,
    /**
     * 現在生成中の印刷データ
     */
    print,
    /**
     * 印刷データを保存する処理
     */
    handleSave,
    /**
     * 印刷コンポーネント
     */
    componentRef,
    /**
     * プリントが押されたときの動作
     */
    handlePrint,
  };
};
