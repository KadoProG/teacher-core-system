'use client';

import { Box, Button, Typography } from '@mui/material';
import React from 'react';
import { PrintLayoutPreview } from '@/components/commons/PrintLayoutPreview';
import { EnglishWordPracDailyReportPrint } from '@/components/prints/EnglishWordPracDailyReportPrint';
import { EnglishWordPracPrint } from '@/components/prints/EnglishWordPracPrint';

const print: IEnglishWordPracPrint = {
  id: 1,
  title: 'アイプロ３　Level21「中２レベルの基本動詞①」',
  words: [
    { en_title: 'variable', jp_title: '変数', type: 'en' },
    { en_title: 'Internal Server Error', jp_title: '内部エラー', type: 'en' },
    { en_title: 'variable', jp_title: '変数', type: 'en' },
    { en_title: 'variable', jp_title: '変数', type: 'jp' },
    { en_title: 'variable', jp_title: '変数', type: 'jp' },
    { en_title: 'variable', jp_title: '変数', type: 'en' },
    { en_title: 'variable', jp_title: '変数', type: 'jp' },
    { en_title: 'variable', jp_title: '変数', type: 'jp' },
    { en_title: 'variable', jp_title: '変数', type: 'en' },
    { en_title: 'variable', jp_title: '変数', type: 'en' },
    { en_title: 'variable', jp_title: '変数', type: 'jp' },
    { en_title: 'variable', jp_title: '変数', type: 'jp' },
    { en_title: 'variable', jp_title: '変数', type: 'en' },
    { en_title: 'variable', jp_title: '変数', type: 'jp' },
    { en_title: 'variable', jp_title: '変数', type: 'jp' },
    { en_title: 'variable', jp_title: '変数', type: 'en' },
    { en_title: 'variable', jp_title: '変数', type: 'en' },
    { en_title: 'variable', jp_title: '変数', type: 'jp' },
    { en_title: 'Australia/Australian', jp_title: '変数', type: 'jp' },
    {
      en_title: 'Australia / Australian',
      jp_title: '～によって・～のそばに・～までに・～によって',
      type: 'en',
    },
  ],
  isShowAnswer: true,
};

const printList = [
  {
    id: 1,
    title: '単語テスト',
    component: <EnglishWordPracPrint print={print} />,
  },
  {
    id: 2,
    title: '単語テストの報告書',
    component: <EnglishWordPracDailyReportPrint />,
  },
];

export const EnglishPage = () => {
  const [selectedPrintId, setSelectedPrintId] = React.useState<number>(1);
  const selectedPrint = printList.find((v) => v.id === selectedPrintId);
  if (!selectedPrint) return null;
  return (
    <Box>
      <Typography variant="h4" component="h1" fontWeight="bold">
        印刷のプレビュー画面
      </Typography>
      {printList.map((v) => (
        <Button
          key={v.id}
          onClick={() => setSelectedPrintId(v.id)}
          color="inherit"
          variant="outlined"
        >
          {v.title}
        </Button>
      ))}
      <PrintLayoutPreview>{selectedPrint.component}</PrintLayoutPreview>
    </Box>
  );
};
