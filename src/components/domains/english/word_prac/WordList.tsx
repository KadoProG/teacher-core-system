import {
  Box,
  Button,
  Paper,
  Table,
  TableBody,
  TableHead,
  Typography,
} from '@mui/material';
import React from 'react';
import { ImportExcelDialog } from '@/components/commons/ImportExcelDialog';
import {
  WordListTableBodyRow,
  WordListTableHeadRow,
} from '@/components/domains/english/word_prac/WordListTableRow';
import { useEnglishWordPrac } from '@/hooks/english/useEnglishWordPrac';

interface WordListProps {
  englishWordPrac: ReturnType<typeof useEnglishWordPrac>;
}

export const WordList: React.FC<WordListProps> = (props) => (
  <>
    <Box display="flex" justifyContent="space-between" alignItems="center">
      <Typography variant="h5" component="h2" fontWeight="bold">
        単語リスト
      </Typography>
      <Box>
        <Button variant="outlined" color="inherit" size="small">
          編集する
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
    <Paper component={Box} p={2}>
      {props.englishWordPrac.words.length === 0 ? (
        <Typography>単語はありません</Typography>
      ) : (
        <Table>
          <TableHead>
            <WordListTableHeadRow />
          </TableHead>
          <TableBody>
            {props.englishWordPrac.words.map((word) => (
              <WordListTableBodyRow key={word.id} word={word} />
            ))}
          </TableBody>
        </Table>
      )}
    </Paper>
  </>
);
