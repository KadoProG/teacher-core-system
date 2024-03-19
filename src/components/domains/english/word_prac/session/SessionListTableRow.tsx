import { TableCell, TableRow, Typography } from '@mui/material';
import React from 'react';

export const SessionListTableHeadRow = () => (
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
      <Typography fontWeight="bold">セッション名</Typography>
    </TableCell>
  </TableRow>
);

interface SessionListTableBodyRowProps {
  session: IEnglishWordPracSession;
}
export const SessionListTableBodyRow: React.FC<SessionListTableBodyRowProps> = (
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
      <Typography>{props.session.row}</Typography>
    </TableCell>
    <TableCell>
      <Typography lineHeight={1}>{props.session.title}</Typography>
    </TableCell>
  </TableRow>
);
