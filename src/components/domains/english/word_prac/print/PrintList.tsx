'use client';

import { Box, Paper, Skeleton, Typography } from '@mui/material';
import React from 'react';
import { PrintListTable } from '@/components/domains/english/word_prac/print/PrintListTable';
import { useEnglishWordPracPrintList } from '@/hooks/english/useEnglishWordPracPrintList';

export const PrintList: React.FC = () => {
  const printHook = useEnglishWordPracPrintList();
  return (
    <>
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <Typography variant="h5" component="h2" fontWeight="bold">
          印刷アーカイブ
        </Typography>
      </Box>
      <Paper component={Box} p={2}>
        {printHook.isLoading ? (
          <>
            {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((v) => (
              <Skeleton key={v} height={50} />
            ))}
          </>
        ) : (
          <PrintListTable printHook={printHook} />
        )}
      </Paper>
    </>
  );
};
