'use client';

import { Box, Stack } from '@mui/material';
import React from 'react';
import { PrintInfo } from '@/components/domains/english/word_prac/PrintInfo';
import { SideSessionList } from '@/components/domains/english/word_prac/SideSessionList';
import { WordList } from '@/components/domains/english/word_prac/WordList';
import { useEnglishWordPracWordList } from '@/hooks/english/useEnglishWordPracWordList';

export const EnglishWordPracPage: React.FC = () => {
  const englishWordPrac = useEnglishWordPracWordList();
  return (
    <Box display="flex">
      <SideSessionList englishWordPrac={englishWordPrac} />
      <Box p={2} component={Stack} spacing={2}>
        <PrintInfo englishWordPrac={englishWordPrac} />
        <WordList englishWordPrac={englishWordPrac} />
      </Box>
    </Box>
  );
};
