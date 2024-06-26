'use client';

import { Box, Stack } from '@mui/material';
import React from 'react';
import { WordListTable } from '@/components/domains/english/word_prac/WordListTable';
import { WordPracSessionSelectPaper } from '@/components/domains/english/word_prac/WordPracSessionSelectPaper';
import { WordPrintInfo } from '@/components/domains/english/word_prac/WordPrintInfo';
import { useEnglishWordPracWordList } from '@/hooks/english/useEnglishWordPracWordList';

export const EnglishWordPracPage: React.FC = () => {
  const englishWordPrac = useEnglishWordPracWordList();

  return (
    <Box component={Stack} spacing={2}>
      <WordPracSessionSelectPaper
        sessions={englishWordPrac.sessions}
        selectedSession={englishWordPrac.selectedSession}
        onSelectSession={englishWordPrac.onSelectSession}
        isLoadingSessions={englishWordPrac.isLoadingSessions}
      />
      <WordPrintInfo englishWordPrac={englishWordPrac} />
      <WordListTable
        session={englishWordPrac.selectedSession}
        isLoading={englishWordPrac.isLoadingWords}
      />
    </Box>
  );
};
