'use client';

import { Box, Stack } from '@mui/material';
import React from 'react';
import { PrintInfo } from '@/components/domains/english/word_prac/PrintInfo';
import { SideSessionList } from '@/components/domains/english/word_prac/SideSessionList';
import { WordList } from '@/components/domains/english/word_prac/WordList';
import { useEnglishWordPrac } from '@/components/hooks/english/useEnglishWordPrac';

export const EnglishWordPracPage: React.FC = () => {
  const englishWordPrac = useEnglishWordPrac();
  return (
    <Box display="flex">
      <SideSessionList sessions={englishWordPrac.sessions} />
      <Box p={2} component={Stack} spacing={2}>
        <PrintInfo />
        <WordList words={englishWordPrac.words} />
      </Box>
    </Box>
  );
};
