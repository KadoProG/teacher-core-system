'use client';

import { Box, Stack } from '@mui/material';
import React from 'react';
import { WordList } from '@/components/domains/english/word_prac/WordList';
import { WordPracSessionSelectPaper } from '@/components/domains/english/word_prac/WordPracSessionSelectPaper';
import { WordPrintInfo } from '@/components/domains/english/word_prac/WordPrintInfo';
import { useEnglishWordPracWordList } from '@/hooks/english/useEnglishWordPracWordList';

export const EnglishWordPracPage: React.FC = () => {
  const englishWordPrac = useEnglishWordPracWordList();
  // const isMin600 = useMediaQuery('(min-width:600px)');
  // const [isOpen, setIsOpen] = React.useState<boolean>(isMin600);
  // React.useEffect(() => {
  //   setIsOpen(isMin600);
  // }, [isMin600]);

  // const handleClose = () => {
  //   if (!isMin600) {
  //     setIsOpen((prev) => !prev);
  //   }
  // };

  return (
    <Box p={2} component={Stack} spacing={2} width="100%" maxWidth={700}>
      <WordPracSessionSelectPaper
        sessions={englishWordPrac.sessions}
        selectedSession={englishWordPrac.selectedSession}
        onSelectSession={englishWordPrac.onSelectSession}
        isLoadingSessions={englishWordPrac.isLoadingSessions}
      />
      <WordPrintInfo englishWordPrac={englishWordPrac} />
      <WordList englishWordPrac={englishWordPrac} />
    </Box>
  );
};
