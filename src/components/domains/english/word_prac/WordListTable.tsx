import { Table, TableBody, TableHead, Typography } from '@mui/material';
import React from 'react';
import {
  WordListTableBodyRow,
  WordListTableHeadRow,
} from '@/components/domains/english/word_prac/WordListTableRow';

interface WordListTableProps {
  words: IEnglishWordPracWord[];
}
export const WordListTable: React.FC<WordListTableProps> = (props) => {
  if (props.words.length === 0) {
    return <Typography>単語はありません</Typography>;
  }
  return (
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
  );
};
