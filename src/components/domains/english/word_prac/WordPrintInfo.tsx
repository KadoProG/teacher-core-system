import { Box, Button, Paper, Stack, Typography } from '@mui/material';
import React from 'react';
import { FormCheckBox } from '@/components/commons/input/FormCheckBox';
import { FormTextField } from '@/components/commons/input/FormTextField';
import { PrintLayoutContainer } from '@/components/commons/PrintLayoutContainer';
import { EnglishWordPracPrint } from '@/components/prints/EnglishWordPracPrint';
import { useEnglishWordPracWordList } from '@/hooks/english/useEnglishWordPracWordList';
import { useEnglishWordPracWordPrintInfo } from '@/hooks/english/useEnglishWordPracWordPrintInfo';

interface PrintInfoProps {
  englishWordPrac: ReturnType<typeof useEnglishWordPracWordList>;
}

export const WordPrintInfo: React.FC<PrintInfoProps> = (props) => {
  const { form, print, handleSave, handlePrint, componentRef } =
    useEnglishWordPracWordPrintInfo(props.englishWordPrac);

  return (
    <Paper component={Box} p={2}>
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <Typography fontWeight="bold" variant="h5">
          印刷する
        </Typography>
        <Stack direction="row" spacing={1}>
          <Button
            variant="outlined"
            color="inherit"
            onClick={handleSave}
            size="small"
          >
            保存する
          </Button>
          <Button
            variant="outlined"
            color="inherit"
            onClick={() => {
              handlePrint(false);
            }}
            size="small"
          >
            すぐ印刷する
          </Button>
          <Button
            variant="outlined"
            color="inherit"
            onClick={() => {
              handlePrint(true);
            }}
            size="small"
          >
            (答)印刷する
          </Button>
        </Stack>
      </Box>
      <PrintLayoutContainer componentRef={componentRef}>
        <EnglishWordPracPrint print={print} />
      </PrintLayoutContainer>
      <Box p={2} component={Stack} spacing={2}>
        <FormTextField
          label="最大出題数"
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
          label="英語・日本語の出題をランダムにする"
          activeLabel="はい"
          negativeLabel="いいえ"
          control={form.control}
          name="is_randam_jp_en"
        />
      </Box>
    </Paper>
  );
};
