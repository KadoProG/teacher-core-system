import React from 'react';
import { useForm } from 'react-hook-form';
import { useSnackbar } from '@/components/commons/feedback/SnackbarContext';
import { usePrinting } from '@/hooks/commons/usePrinting';
import { useEnglishWordPracWordList } from '@/hooks/english/useEnglishWordPracWordList';

export const useEnglishWordPracPrinting = (
  englishWordPrac: ReturnType<typeof useEnglishWordPracWordList>
) => {
  const { addMessageObject } = useSnackbar();

  const printingComponentRef = React.useRef<HTMLDivElement>(null);

  const { handlePrintingButtonClick } = usePrinting({
    printingComponentRef,
  });

  const form = useForm<{
    is_randam_jp_en: boolean;
    is_randam_word: boolean;
    word_count: number;
  }>({
    defaultValues: {
      is_randam_jp_en: false,
      is_randam_word: false,
      word_count: 10,
    },
  });

  const session = englishWordPrac.sessions.find(
    (session) => englishWordPrac.selectedSessionId === session.id
  );

  const sessionTitle = `アイプロⅢ　level${session?.id}「${session?.title}」`;

  const wordPracListBefore: IEnglishWordPracPrint['words'] =
    englishWordPrac.words.map((word) => {
      let type: IEnglishWordPracPrint['words'][number]['type'] = 'en';
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

  const handleSaveButtonClick = async () => {
    addMessageObject('保存の処理が実行されます', 'success');
  };

  return {
    /**
     * 印刷条件のフォーム
     */
    form,
    /**
     * 単語テストの単語リスト
     */
    wordPracList,
    /**
     * 印刷ボタンクリック時の処理
     */
    handlePrintButtonClick: handlePrintingButtonClick,
    /**
     * 保存ボタンクリック時の処理
     */
    handleSaveButtonClick,
    /**
     * 印刷レイアウト
     */
    componentRef: printingComponentRef,
    /**
     * セッションのタイトル
     */
    sessionTitle,
  };
};
