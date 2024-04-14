import { Table, TableBody, TableHead, Typography } from '@mui/material';
import React from 'react';
import {
  WordListTableBodyRow,
  WordListTableHeadRow,
} from '@/components/domains/english/word_prac/WordListTableRow';
import { useTableRowCheckbox } from '@/hooks/commons/useTableRowCheckbox';

interface WordListTableProps {
  words: IEnglishWordPracWord[];
}
export const WordListTable: React.FC<WordListTableProps> = (props) => {
  const { selectedIds, handleSingleClick, handleAllClick, isAllSelected } =
    useTableRowCheckbox(props.words.map((v) => v.id));

  if (props.words.length === 0) {
    return <Typography>単語はありません</Typography>;
  }

  return (
    <Table>
      <TableHead>
        <WordListTableHeadRow
          isChecked={isAllSelected}
          handleAllClick={handleAllClick}
        />
      </TableHead>
      <TableBody>
        {props.words.map((word) => (
          <WordListTableBodyRow
            key={word.id}
            word={word}
            isChecked={selectedIds.includes(word.id ?? '')}
            handleSingleClick={handleSingleClick}
          />
        ))}
      </TableBody>
    </Table>
  );
};
