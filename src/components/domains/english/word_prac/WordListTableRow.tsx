import { TableCell, TableRow, Typography } from '@mui/material';
import React from 'react';

export const WordListTableHeadRow = () => (
  <TableRow
    sx={{
      th: {
        p: 1,
      },
    }}
  >
    <TableCell width={80}>
      <Typography fontWeight="bold">番号</Typography>
    </TableCell>
    <TableCell>
      <Typography fontWeight="bold">英単語</Typography>
    </TableCell>
    <TableCell>
      <Typography fontWeight="bold">日本語</Typography>
    </TableCell>
    <TableCell width={100}>
      <Typography fontWeight="bold">履修学年</Typography>
    </TableCell>
    <TableCell width={100}>
      <Typography fontWeight="bold">カスタム</Typography>
    </TableCell>
  </TableRow>
);

interface WordListTableBodyRowProps {
  word: IEnglishWordPracWord;
}
export const WordListTableBodyRow: React.FC<WordListTableBodyRowProps> = (
  props
) => (
  <TableRow
    sx={{
      td: {
        p: 1,
      },
    }}
  >
    <TableCell>
      <Typography>{props.word.row}</Typography>
    </TableCell>
    <TableCell>
      <Typography lineHeight={1}>{props.word.en_title}</Typography>
    </TableCell>
    <TableCell>
      <Typography lineHeight={1}>{props.word.jp_title}</Typography>
    </TableCell>
    <TableCell>
      <Typography>{props.word.study_year}</Typography>
    </TableCell>
    <TableCell>hai</TableCell>
  </TableRow>
);
