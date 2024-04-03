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
  const {
    form,
    wordPracList,
    handlePrintButtonClick,
    componentRef,
    sessionTitle,
    handleSaveButtonClick,
  } = useEnglishWordPracPrint(props.englishWordPrac);

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
            onClick={handleSaveButtonClick}
          >
            保存する
          </Button>
          <Button
            variant="outlined"
            color="inherit"
            onClick={handlePrintButtonClick}
          >
            すぐ印刷する
          </Button>
        </Stack>
      </Box>
      <PrintLayoutContainer componentRef={componentRef}>
        <EnglishWordPracPrint
          title={sessionTitle}
          words={wordPracList}
          isShowAnswer={true}
        />
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
