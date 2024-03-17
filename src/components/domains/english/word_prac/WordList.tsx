import {
  Box,
  Button,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Typography,
} from '@mui/material';
import React from 'react';

export const WordList: React.FC = () => (
  <>
    <Box display="flex" justifyContent="space-between" alignItems="center">
      <Typography variant="h5" component="h2" fontWeight="bold">
        単語リスト
      </Typography>
      <Box>
        <Button variant="outlined" color="inherit" size="small">
          編集する
        </Button>
        <Button variant="outlined" color="inherit" size="small">
          単語を追加する
        </Button>
      </Box>
    </Box>
    <Paper component={Box} p={2}>
      <Table>
        <TableHead>
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
            <TableCell width={100}>
              <Typography fontWeight="bold">カスタム</Typography>
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          <TableRow
            sx={{
              td: {
                p: 1,
              },
            }}
          >
            <TableCell>
              <Typography>111</Typography>
            </TableCell>
            <TableCell>
              <Typography lineHeight={1}>seventeen / seventeenth</Typography>
            </TableCell>
            <TableCell>
              <Typography lineHeight={1}>
                ～によって・～のそばに・～までに・～によって
              </Typography>
            </TableCell>
            <TableCell>
              <Typography>中1 ~中3</Typography>
            </TableCell>
            <TableCell>hai</TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </Paper>
  </>
);
