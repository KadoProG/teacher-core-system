'use client';

import { Box, Button, Typography } from '@mui/material';
import React from 'react';
import { PrintLayoutPreview } from '@/components/commons/PrintLayoutPreview';
import { EnglishWordPracDailyReportPrint } from '@/components/prints/EnglishWordPracDailyReportPrint';
import { EnglishWordPracPrint } from '@/components/prints/EnglishWordPracPrint';

const printList = [
  { id: 1, title: '単語テスト', component: <EnglishWordPracPrint /> },
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
      <PrintLayoutPreview>{selectedPrint.component}</PrintLayoutPreview>;
    </Box>
  );
};
