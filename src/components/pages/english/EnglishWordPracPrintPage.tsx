import { Box, Stack } from '@mui/material';
import React from 'react';
import { PrintList } from '@/components/domains/english/word_prac/print/PrintList';

export const EnglishWordPracPrintPage: React.FC = () => (
  <Box p={2} component={Stack} spacing={2}>
    <PrintList />
  </Box>
);
