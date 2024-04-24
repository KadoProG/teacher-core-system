'use client';

import { Box, Paper, Skeleton, Typography } from '@mui/material';
import React from 'react';
import { FormSwitch } from '@/components/commons/input/FormSwitch';
import { PrintLayoutContainer } from '@/components/commons/PrintLayoutContainer';
import { PrintListTable } from '@/components/domains/english/word_prac/print/PrintListTable';
import { EnglishWordPracPrint } from '@/components/prints/EnglishWordPracPrint';
import { usePrinting } from '@/hooks/commons/usePrinting';
import { useEnglishWordPracPrintList } from '@/hooks/english/useEnglishWordPracPrintList';

export const PrintList: React.FC = () => {
  const componentRef = React.useRef<HTMLDivElement>(null);
  const { handlePrint: handlePrintProp } = usePrinting({ componentRef });
  const printHook = useEnglishWordPracPrintList({ handlePrintProp });
  return (
    <>
      {printHook.selectedPrint && (
        <PrintLayoutContainer componentRef={componentRef}>
          <EnglishWordPracPrint print={printHook.selectedPrint} />
        </PrintLayoutContainer>
      )}
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <Typography variant="h5" component="h2" fontWeight="bold">
          印刷アーカイブ
        </Typography>
        <Box component={Paper} display="inline-flex" alignItems="center">
          <Typography px={1}>答えを印刷</Typography>
          <FormSwitch
            name="is_show_answer"
            control={printHook.form.control}
            label=""
            activeLabel="はい　"
            negativeLabel="いいえ"
            isDense
          />
        </Box>
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
