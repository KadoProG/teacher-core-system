import { Table, TableBody, TableHead, Typography } from '@mui/material';
import React from 'react';
import {
  WordListTableBodyRow,
  WordListTableHeadRow,
} from '@/components/domains/english/word_prac/WordListTableRow';
import { useTableRowCheckbox } from '@/hooks/commons/useTableRowCheckbox';

interface WordListTableProps {
  session: IEnglishWordPracSession;
}
export const WordListTable: React.FC<WordListTableProps> = (props) => {
  const { selectedIds, handleSingleClick, handleAllClick, isAllSelected } =
    useTableRowCheckbox(props.session.words.map((v) => v.id));

  if (props.session.words.length === 0) {
    return <Typography>単語はありません</Typography>;
  }

  return (
    <Table sx={{ overflow: 'scroll' }}>
      <TableHead>
        <WordListTableHeadRow
          isChecked={isAllSelected}
          handleAllClick={handleAllClick}
        />
      </TableHead>
      <TableBody>
        {props.session.words.map((word) => (
          <WordListTableBodyRow
            key={word.row + '__' + props.session.id}
            word={word}
            isChecked={selectedIds.includes(word.id ?? '')}
            handleSingleClick={handleSingleClick}
          />
        ))}
      </TableBody>
    </Table>
  );
};
