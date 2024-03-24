import { Box, Button, Paper, Stack, Typography } from '@mui/material';
import React from 'react';
import { FormCheckBox } from '@/components/commons/input/FormCheckBox';
import { FormTextField } from '@/components/commons/input/FormTextField';
import { PrintLayoutContainer } from '@/components/commons/PrintLayoutContainer';
import { EnglishWordPracPrint } from '@/components/prints/EnglishWordPracPrint';
import { useEnglishWordPrac } from '@/hooks/english/useEnglishWordPrac';
import { useEnglishWordPracPrint } from '@/hooks/english/useEnglishWordPracPrint';

interface PrintInfoProps {
  englishWordPrac: ReturnType<typeof useEnglishWordPrac>;
}

export const PrintInfo: React.FC<PrintInfoProps> = (props) => {
  const { form, wordPracList, handlePrintButtonClick, componentRef } =
    useEnglishWordPracPrint(props.englishWordPrac);

  return (
    <Paper component={Box} p={2}>
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <Typography fontWeight="bold" variant="h5">
          印刷する
        </Typography>
        <Button
          variant="outlined"
          color="inherit"
          onClick={handlePrintButtonClick}
        >
          印刷する
        </Button>
      </Box>
      <PrintLayoutContainer componentRef={componentRef}>
        <EnglishWordPracPrint
          title="アイプロ３　Level21「中２レベルの基本動詞①」"
          words={wordPracList}
          isShowAnswer={true}
        />
      </PrintLayoutContainer>
      <Box p={2} component={Stack} spacing={2}>
        <FormTextField
          label="単語の個数"
          type="number"
          name="word_count"
          isRequired
          control={form.control}
        />
        <FormCheckBox
          label="単語をランダムに出題する"
          activeLabel="はい"
          negativeLabel="いいえ"
          control={form.control}
          name="is_randam_word"
        />
        <FormCheckBox
          label="答えを印刷する"
          activeLabel="はい"
          negativeLabel="いいえ"
          control={form.control}
          name="is_randam_jp_en"
        />
      </Box>
    </Paper>
  );
};
