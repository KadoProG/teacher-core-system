import {
  Box,
  Button,
  Paper,
  Skeleton,
  TableContainer,
  Typography,
} from '@mui/material';
import React from 'react';
import { ImportExcelDialog } from '@/components/commons/ImportExcelDialog';
import { WordListTable } from '@/components/domains/english/word_prac/WordListTable';
import { useEnglishWordPracWordList } from '@/hooks/english/useEnglishWordPracWordList';

interface WordListProps {
  englishWordPrac: ReturnType<typeof useEnglishWordPracWordList>;
}

export const WordList: React.FC<WordListProps> = (props) => (
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
          onClick={props.englishWordPrac.dropDialog.handleOpen}
        >
          インポートする
        </Button>
        <ImportExcelDialog
          isOpen={props.englishWordPrac.dropDialog.isOpen}
          onClose={props.englishWordPrac.dropDialog.handleClose}
          dropzone={props.englishWordPrac.dropzone}
        />
      </Box>
    </Box>
    <TableContainer component={Paper} sx={{ p: 2 }}>
      {props.englishWordPrac.isLoadingWords ? (
        <>
          {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((v) => (
            <Skeleton key={v} height={50} />
          ))}
        </>
      ) : (
        <WordListTable words={props.englishWordPrac.words} />
      )}
    </TableContainer>
  </>
);
