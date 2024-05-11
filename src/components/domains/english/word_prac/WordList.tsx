import { Box, Button, Typography } from '@mui/material';
import React from 'react';
import { ImportExcelDialog } from '@/components/commons/ImportExcelDialog';
import { WordListTable } from '@/components/domains/english/word_prac/WordListTable';
import { useEnglishWordPracWordList } from '@/hooks/english/useEnglishWordPracWordList';
import { useEnglishWordPracWordUpload } from '@/hooks/english/useEnglishWordPracWordUpload';

interface WordListProps {
  englishWordPrac: ReturnType<typeof useEnglishWordPracWordList>;
}

export const WordList: React.FC<WordListProps> = (props) => {
  const { dropzone, dropDialog } = useEnglishWordPracWordUpload({
    sessions: props.englishWordPrac.sessions,
  });
  return (
    <>
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <Typography variant="h5" component="h2" fontWeight="bold">
          単語リスト
        </Typography>
        <Box>
          <Button
            variant="contained"
            color="error"
            size="small"
            onClick={props.englishWordPrac.handleWordsDelete}
          >
            削除する
          </Button>
          <Button
            variant="outlined"
            color="inherit"
            size="small"
            onClick={dropDialog.handleOpen}
          >
            インポートする
          </Button>
          <ImportExcelDialog
            isOpen={dropDialog.isOpen}
            onClose={dropDialog.handleClose}
            dropzone={dropzone}
          />
        </Box>
      </Box>
      <WordListTable
        session={props.englishWordPrac.selectedSession}
        isLoading={props.englishWordPrac.isLoadingWords}
      />
    </>
  );
};
