'use client';
import { Box, Button } from '@mui/material';
import jsPDF from 'jspdf';
import React from 'react';
import { useReactToPrint } from 'react-to-print';
import { PrintLayoutContainer } from '@/components/commons/PrintLayoutContainer';
import './ipaexg-normal';

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

interface PrintLayoutPreviewProps {
  children: React.ReactNode;
}

/**
 * ### 印刷プレビュー
 * 印刷した際の見え方や、実際に印刷をすることができる
 */
export const PrintLayoutPreview: React.FC<PrintLayoutPreviewProps> = (
  props
) => {
  const componentRef = React.useRef<HTMLDivElement>(null);
  const pdfRef = React.useRef(new jsPDF());
  /**
   * 印刷対象のコンポーネントを設定します
   */
  const reactToPrintContent = React.useCallback(() => {
    if (!componentRef.current) return null;
    return componentRef.current;
  }, []);

  const handlePrint = () => {
    if (!componentRef.current) return;
    pdfRef.current.html(componentRef.current, {
      callback(doc) {
        const fileName = 'test.pdf';
        doc.setFont('ipaexg', 'normal'); // ここもuseEffect使用しなくても大丈夫でした。
        doc.setFontSize(12);
        doc.save(fileName);
      },
      x: 15,
      y: 15,
      width: 170,
      windowWidth: 775,
    });
  };
  // const handlePrint = useReactToPrint({
  //   pageStyle, // 印刷のスタイリングを指定
  //   content: reactToPrintContent, // 印刷エリアを指定
  //   removeAfterPrint: true, // 印刷後に印刷用のiframeを削除する
  // });

  return (
    <Box>
      <Button onClick={handlePrint} variant="contained">
        印刷しちゃう
      </Button>
      <PrintLayoutContainer componentRef={componentRef} isShowPreview>
        {props.children}
      </PrintLayoutContainer>
    </Box>
  );
};
