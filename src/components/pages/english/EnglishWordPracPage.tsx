'use client';

import { Box, Stack } from '@mui/material';
import React from 'react';
import { PrintInfo } from '@/components/domains/english/word_prac/PrintInfo';
import { WordList } from '@/components/domains/english/word_prac/WordList';

export const EnglishWordPracPage: React.FC = () => (
  <Box p={2} component={Stack} spacing={2}>
    <PrintInfo />
    <WordList />
  </Box>
);
