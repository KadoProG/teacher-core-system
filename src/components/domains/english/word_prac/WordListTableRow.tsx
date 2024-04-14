import { Checkbox, TableCell, TableRow, Typography } from '@mui/material';
import React from 'react';
import { useTableRowCheckbox } from '@/hooks/commons/useTableRowCheckbox';

interface WordListTableHeadRowProps {
  isChecked: boolean;
  handleAllClick: ReturnType<typeof useTableRowCheckbox>['handleAllClick'];
}

export const WordListTableHeadRow: React.FC<WordListTableHeadRowProps> = (
  props
) => (
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
    <TableCell>
      <Checkbox
        checked={props.isChecked}
        onChange={() => props.handleAllClick()}
      />
    </TableCell>
  </TableRow>
);

interface WordListTableBodyRowProps {
  word: IEnglishWordPracWord;
  isChecked: boolean;
  handleSingleClick: ReturnType<
    typeof useTableRowCheckbox
  >['handleSingleClick'];
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
    <TableCell>
      <Checkbox
        checked={props.isChecked}
        onChange={() => props.word.id && props.handleSingleClick(props.word.id)}
      />
    </TableCell>
  </TableRow>
);
