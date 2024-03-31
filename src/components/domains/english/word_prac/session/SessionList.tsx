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
import { ImportExcelDialog } from '@/components/commons/ImportExcelDialog';
import {
  SessionListTableBodyRow,
  SessionListTableHeadRow,
} from '@/components/domains/english/word_prac/session/SessionListTableRow';
import { useEnglishWordPracSession } from '@/hooks/english/useEnglishWordPracSession';

export const SessionList: React.FC = () => {
  const englishWordPracSession = useEnglishWordPracSession();

  return (
    <>
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <Typography variant="h5" component="h2" fontWeight="bold">
          セッションを編集します
        </Typography>
        <Box>
          <Button
            variant="contained"
            color="error"
            size="small"
            onClick={englishWordPracSession.handleSessionsDelete}
          >
            削除する
          </Button>
          <Button
            variant="outlined"
            color="inherit"
            size="small"
            onClick={englishWordPracSession.dropDialog.handleOpen}
          >
            インポートする
          </Button>
          <ImportExcelDialog
            isOpen={englishWordPracSession.dropDialog.isOpen}
            onClose={englishWordPracSession.dropDialog.handleClose}
            dropzone={englishWordPracSession.dropzone}
          />
        </Box>
      </Box>
      <Paper component={Box} p={2}>
        {englishWordPracSession.sessions.length === 0 ? (
          <Typography>セッションはありません</Typography>
        ) : (
          <Table>
            <TableHead>
              <SessionListTableHeadRow />
            </TableHead>
            <TableBody>
              {englishWordPracSession.sessions.map((session) => (
                <SessionListTableBodyRow key={session.id} session={session} />
              ))}
            </TableBody>
          </Table>
        )}
      </Paper>
    </>
  );
};
