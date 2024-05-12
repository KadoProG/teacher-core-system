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
import {
  SessionListTableBodyRow,
  SessionListTableHeadRow,
} from '@/components/domains/english/word_prac/session/SessionListTableRow';

interface SessionListTableProps {
  isLoading?: boolean;
  sessions: IEnglishWordPracSession[];
}

export const SessionListTable: React.FC<SessionListTableProps> = (props) => {
  if (props.isLoading) {
    return (
      <Paper component={Box} p={2}>
        {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((v) => (
          <Skeleton key={v} height={50} />
        ))}
      </Paper>
    );
  }

  if (!props.sessions || props.sessions.length === 0) {
    return (
      <Paper component={Box} p={2}>
        <Typography>セッションはありません</Typography>
      </Paper>
    );
  }

  return (
    <TableContainer component={Paper} sx={{ p: 2 }}>
      <Table>
        <TableHead>
          <SessionListTableHeadRow />
        </TableHead>
        <TableBody>
          {props.sessions.map((session) => (
            <SessionListTableBodyRow key={session.id} session={session} />
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};
