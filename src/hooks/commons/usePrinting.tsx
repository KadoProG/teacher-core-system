import React from 'react';
import { useReactToPrint } from 'react-to-print';

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

/**
 * 印刷を行うhook関数
 * @param printingComponentRef 実際に印刷するref要素
 */
export const usePrinting = ({
  printingComponentRef,
}: {
  printingComponentRef: React.RefObject<HTMLDivElement>;
}) => {
  /**
   * 印刷対象のコンポーネントを設定します
   */
  const reactToPrintContent = React.useCallback(() => {
    if (!printingComponentRef.current) return null;
    return printingComponentRef.current;
  }, [printingComponentRef]);

  // 印刷プレビューを発火する関数
  const handlePrintingButtonClick = useReactToPrint({
    pageStyle, // 印刷のスタイリングを指定
    content: reactToPrintContent, // 印刷エリアを指定
    removeAfterPrint: true, // 印刷後に印刷用のiframeを削除する
  });

  return { handlePrintingButtonClick };
};
