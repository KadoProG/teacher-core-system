import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Paper,
  Table,
  TableBody,
  TableHead,
  Typography,
} from '@mui/material';
import React from 'react';
import {
  SessionListTableBodyRow,
  SessionListTableHeadRow,
} from '@/components/domains/english/word_prac/session/SessionListTableRow';

export const SessionList: React.FC = () => {
  const sessionListData: IEnglishWordPracSession[] = [
    {
      id: 1,
      row: 1,
      title: '基本動詞①',
      memo: '',
      created_at: '2024-03-17T22:24:10.852Z' as unknown as Date,
      updated_at: '2024-03-17T22:24:10.852Z' as unknown as Date,
    },
    {
      id: 2,
      row: 2,
      title: 'スポーツ・趣味・食べ物',
      memo: '',
      created_at: '2024-03-17T22:24:10.852Z' as unknown as Date,
      updated_at: '2024-03-17T22:24:10.852Z' as unknown as Date,
    },
  ];

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
          <Button variant="outlined" color="inherit" size="small">
            インポートする
          </Button>
          <Dialog open={true}>
            <DialogTitle>
              <Typography>何かをアップロードする</Typography>
            </DialogTitle>
            <DialogContent>
              <Button variant="contained" component="label">
                Upload File
                <input type="file" style={{ display: 'none' }} />
              </Button>
            </DialogContent>
            <DialogActions></DialogActions>
          </Dialog>
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
            {sessionListData.map((session) => (
              <SessionListTableBodyRow key={session.id} session={session} />
            ))}
          </TableBody>
        </Table>
      </Paper>
    </>
  );
};
