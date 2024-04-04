import React from 'react';
import { useForm } from 'react-hook-form';
import { useReactToPrint } from 'react-to-print';
import { useSnackbar } from '@/components/commons/feedback/SnackbarContext';
import { useEnglishWordPrac } from '@/hooks/english/useEnglishWordPrac';

/**
 * 印刷時のスタイル設定（印刷仕様に応じてスタイリングを調整します）
 * 　NOTE
 * 　・背景色/背景画像を表示させる設定（Chrome）：-webkit-print-color-adjust: exact
 * 　・pageのmargin指定でプレビュー時にデフォルト表示されるURLと時刻（ヘッダーとフッター）を表示エリアから外している
 *  https://zenn.dev/ikefukurou777/articles/606bf9f02cee7d より
 */
const pageStyle = `
    @page { 
      size: auto;
      margin: 5mm;
    }
    
    @media print {
      body { -webkit-print-color-adjust: exact; }
      table { break-after: auto; }
      tr    { break-inside:avoid; break-after:auto }
      td    { break-inside:avoid; break-after:auto }
    }
  `;

export const useEnglishWordPracPrint = (
  englishWordPrac: ReturnType<typeof useEnglishWordPrac>
) => {
  const { addMessageObject } = useSnackbar();

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

  const componentRef = React.useRef<HTMLDivElement>(null);

  const session = englishWordPrac.sessions.find(
    (session) => englishWordPrac.selectedSessionId === session.id
  );

  const sessionTitle = `アイプロⅢ　level${session?.id}「${session?.title}」`;

  const wordPracListBefore: EnglishWordPracPrint['words'] =
    englishWordPrac.words.map((word) => {
      let type: EnglishWordPracPrint['words'][number]['type'] = 'en';
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

  /**
   * 印刷対象のコンポーネントを設定します
   */
  const reactToPrintContent = React.useCallback(() => {
    if (!componentRef.current) return null;
    return componentRef.current;
  }, []);

  const handlePrintButtonClick = useReactToPrint({
    pageStyle, // 印刷のスタイリングを指定
    content: reactToPrintContent, // 印刷エリアを指定
    removeAfterPrint: true, // 印刷後に印刷用のiframeを削除する
  });

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
    handlePrintButtonClick,
    /**
     * 保存ボタンクリック時の処理
     */
    handleSaveButtonClick,
    /**
     * 印刷レイアウト
     */
    componentRef,
    /**
     * セッションのタイトル
     */
    sessionTitle,
  };
};
