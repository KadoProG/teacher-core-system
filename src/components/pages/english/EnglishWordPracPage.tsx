'use client';

import { Box, Stack } from '@mui/material';
import React from 'react';
import { SideSessionList } from '@/components/domains/english/word_prac/SideSessionList';
import { WordList } from '@/components/domains/english/word_prac/WordList';
import { WordPrintInfo } from '@/components/domains/english/word_prac/WordPrintInfo';
import { useEnglishWordPracWordList } from '@/hooks/english/useEnglishWordPracWordList';

export const EnglishWordPracPage: React.FC = () => {
  const englishWordPrac = useEnglishWordPracWordList();
  return (
    <Box display="flex">
      <SideSessionList englishWordPrac={englishWordPrac} />
      <Box p={2} component={Stack} spacing={2}>
        <WordPrintInfo englishWordPrac={englishWordPrac} />
        <WordList englishWordPrac={englishWordPrac} />
      </Box>
    </Box>
  );
};
