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

export const WordList: React.FC = () => {
  const wordListData: IEnglishWordPracWord[] = [
    {
      id: 'aaa',
      session_id: '1',
      row: '1',
      jp_title: '変数',
      en_title: 'variable',
      study_year: '中学1',
      memo: '',
      created_at: '2024-03-17T22:24:10.852Z' as unknown as Date,
      updated_at: '2024-03-17T22:24:10.852Z' as unknown as Date,
    },
    {
      id: 'aab',
      session_id: '1',
      row: '999',
      jp_title: '～によって・～のそばに・～までに・～によって',
      en_title: 'seventeen / seventeenth',
      study_year: '中1 ~中3',
      memo: '今日は今回はタイピング練習をしていこうと思います',
      created_at: '2024-03-17T22:24:10.852Z' as unknown as Date,
      updated_at: '2024-03-17T22:24:10.852Z' as unknown as Date,
    },
  ];

  return (
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
            {wordListData.map((word) => (
              <WordListTableBodyRow key={word.id} word={word} />
            ))}
          </TableBody>
        </Table>
      </Paper>
    </>
  );
};
