'use client';
import { Box, Button } from '@mui/material';
import jsPDF from 'jspdf';
import React from 'react';
import { PrintLayoutContainer } from '@/components/commons/PrintLayoutContainer';
import './ipaexg-normal';

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
