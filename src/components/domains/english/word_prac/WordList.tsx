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
import {
  WordListTableBodyRow,
  WordListTableHeadRow,
} from '@/components/domains/english/word_prac/WordListTableRow';

interface WordListProps {
  words: IEnglishWordPracWord[];
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
        <Button variant="outlined" color="inherit" size="small">
          単語を追加する
        </Button>
      </Box>
    </Box>
    <Paper component={Box} p={2}>
      <Table>
        <TableHead>
          <WordListTableHeadRow />
        </TableHead>
        <TableBody>
          {props.words.map((word) => (
            <WordListTableBodyRow key={word.id} word={word} />
          ))}
        </TableBody>
      </Table>
    </Paper>
  </>
);
