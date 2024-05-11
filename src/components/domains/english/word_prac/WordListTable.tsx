import {
  Box,
  Paper,
  Skeleton,
  Table,
  TableBody,
  TableContainer,
  TableHead,
  Typography,
} from '@mui/material';
import React from 'react';
import {
  WordListTableBodyRow,
  WordListTableHeadRow,
} from '@/components/domains/english/word_prac/WordListTableRow';
import { useTableRowCheckbox } from '@/hooks/commons/useTableRowCheckbox';

interface WordListTableProps {
  session?: IEnglishWordPracSession;
  isLoading?: boolean;
}
export const WordListTable: React.FC<WordListTableProps> = (props) => {
  const { selectedIds, handleSingleClick, handleAllClick, isAllSelected } =
    useTableRowCheckbox(props.session?.words?.map((v) => v.id) ?? []);

  if (props.isLoading) {
    return (
      <Paper component={Box} p={2}>
        {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((v) => (
          <Skeleton key={v} height={50} />
        ))}
      </Paper>
    );
  }

  if (!props.session?.words || props.session?.words.length === 0) {
    return (
      <Paper component={Box} p={2}>
        <Typography>単語はありません</Typography>
      </Paper>
    );
  }

  return (
    <TableContainer component={Paper} sx={{ p: 2 }}>
      <Table sx={{ overflow: 'scroll' }}>
        <TableHead>
          <WordListTableHeadRow
            isChecked={isAllSelected}
            handleAllClick={handleAllClick}
          />
        </TableHead>
        <TableBody>
          {props.session?.words.map((word) => (
            <WordListTableBodyRow
              key={word.row + '__' + props.session?.id}
              word={word}
              isChecked={selectedIds.includes(word.id ?? '')}
              handleSingleClick={handleSingleClick}
            />
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};
