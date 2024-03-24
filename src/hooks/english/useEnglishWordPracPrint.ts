import React from 'react';
import { useForm } from 'react-hook-form';
import { useReactToPrint } from 'react-to-print';
import { EnglishWordPracPrintProps } from '@/components/prints/EnglishWordPracPrint';
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
  const form = useForm();

  const componentRef = React.useRef<HTMLDivElement>(null);

  const wordPracList: EnglishWordPracPrintProps['words'] = React.useMemo(
    () =>
      englishWordPrac.words.map((word) => ({
        ...word,
        type: 'en',
      })),
    [englishWordPrac.words]
  );

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
     * 印刷レイアウト
     */
    componentRef,
  };
};
