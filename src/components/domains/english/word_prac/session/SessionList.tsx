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
import { SessionListImportExcelDialog } from '@/components/domains/english/word_prac/session/SessionListImportExcelDialog';
import {
  SessionListTableBodyRow,
  SessionListTableHeadRow,
} from '@/components/domains/english/word_prac/session/SessionListTableRow';
import { useEnglishWordPracSession } from '@/hooks/english/useEnglishWordPracSession';

export const SessionList: React.FC = () => {
  const englishWordPracSession = useEnglishWordPracSession();

  const [isOpenDialog, setIsOpenDialog] = React.useState<boolean>(false);

  const handleClose = () => {
    setIsOpenDialog(false);
  };
  const handleOpen = () => {
    setIsOpenDialog(true);
  };

  return (
    <>
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <Typography variant="h5" component="h2" fontWeight="bold">
          セッションを編集します
        </Typography>
        <Box>
          <Button variant="outlined" color="inherit" size="small">
            並び替え
          </Button>
          <Button
            variant="outlined"
            color="inherit"
            size="small"
            onClick={handleOpen}
          >
            インポートする
          </Button>
          <SessionListImportExcelDialog
            isOpen={isOpenDialog}
            onClose={handleClose}
          />
          <Button variant="outlined" color="inherit" size="small">
            追加する
          </Button>
        </Box>
      </Box>
      <Paper component={Box} p={2}>
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
      </Paper>
    </>
  );
};
