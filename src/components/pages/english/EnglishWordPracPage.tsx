'use client';

import {
  Box,
  Button,
  Paper,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Typography,
} from '@mui/material';
import React from 'react';
import { FormCheckBox } from '@/components/commons/input/FormCheckBox';
import { FormTextField } from '@/components/commons/input/FormTextField';

export const EnglishWordPracPage: React.FC = () => (
  <Box p={2} component={Stack} spacing={2}>
    <Paper component={Box} p={2}>
      <Typography fontWeight="bold">印刷条件</Typography>
      <Box p={2} component={Stack} spacing={2}>
        <FormTextField
          label="単語の個数"
          value="10"
          type="number"
          onChange={() => {}}
        />
        <FormCheckBox
          label="単語をランダムに出題する"
          isChecked={false}
          activeLabel="はい"
          negativeLabel="いいえ"
          onChange={() => {}}
        />
        <FormCheckBox
          label="答えを印刷する"
          isChecked={false}
          activeLabel="はい"
          negativeLabel="いいえ"
          onChange={() => {}}
        />
      </Box>
    </Paper>
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
  </Box>
);
