'use client';

import MenuIcon from '@mui/icons-material/Menu';
import {
  Box,
  IconButton,
  Paper,
  Stack,
  Typography,
  useMediaQuery,
} from '@mui/material';
import React from 'react';
import { WordPracSessionSelectPaper } from '@/components/domains/english/word_prac/FormSessionSelect';
import { SideSessionList } from '@/components/domains/english/word_prac/SideSessionList';
import { WordList } from '@/components/domains/english/word_prac/WordList';
import { WordPrintInfo } from '@/components/domains/english/word_prac/WordPrintInfo';
import { useEnglishWordPracWordList } from '@/hooks/english/useEnglishWordPracWordList';

export const EnglishWordPracPage: React.FC = () => {
  const englishWordPrac = useEnglishWordPracWordList();
  const isMin600 = useMediaQuery('(min-width:600px)');
  const [isOpen, setIsOpen] = React.useState<boolean>(isMin600);
  React.useEffect(() => {
    setIsOpen(isMin600);
  }, [isMin600]);

  const handleClose = () => {
    if (!isMin600) {
      setIsOpen((prev) => !prev);
    }
  };

  return (
    <Box display="flex">
      <SideSessionList
        englishWordPrac={englishWordPrac}
        isOpen={isOpen}
        isMin600={isMin600}
        onClose={handleClose}
      />
      <Box p={2} component={Stack} spacing={2} width="100%" maxWidth={700}>
        {!isMin600 && (
          <Box component={Paper} display="flex" alignItems="center">
            <IconButton
              onClick={handleClose}
              aria-label="セッションリストを表示"
            >
              <MenuIcon />
            </IconButton>
            <Typography>セッションを変更する</Typography>
          </Box>
        )}
        <WordPracSessionSelectPaper
          sessions={englishWordPrac.sessions}
          selectedSession={englishWordPrac.selectedSession}
          onSelectSession={englishWordPrac.onSelectSession}
        />
        <WordPrintInfo englishWordPrac={englishWordPrac} />
        <WordList englishWordPrac={englishWordPrac} />
      </Box>
    </Box>
  );
};
