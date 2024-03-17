import { Box, Paper, Stack, Typography } from '@mui/material';
import React from 'react';
import { useForm } from 'react-hook-form';
import { FormCheckBox } from '@/components/commons/input/FormCheckBox';
import { FormTextField } from '@/components/commons/input/FormTextField';

export const PrintInfo: React.FC = () => {
  const form = useForm();
  return (
    <Paper component={Box} p={2}>
      <Typography fontWeight="bold">印刷条件</Typography>
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
