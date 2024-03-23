import {
  Box,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Typography,
} from '@mui/material';
import React from 'react';

interface EnglishWordPracPrintProps {
  title: string;
  words: { en_title: string; jp_title: string; type: 'en' | 'jp' }[];
}

/**
 * # 単語テスト
 */
export const EnglishWordPracPrint: React.FC<EnglishWordPracPrintProps> = (
  props
) => (
  <Box px={5} pt={5} position="relative" height={1080}>
    <Box
      border={(theme) => `1px solid ${theme.palette.text.primary}`}
      display="flex"
      alignItems="center"
      p={0.3}
    >
      <Typography
        flex={1}
        height={54}
        px={0.3}
        lineHeight="54px"
        border={(theme) => `1px solid ${theme.palette.text.primary}`}
      >
        {props.title}
        <Typography variant="body2" component="span">
          （99問）
        </Typography>
      </Typography>
      <Typography
        variant="body2"
        width="32.5%"
        height={54}
        ml={0.3}
        px={0.3}
        border={(theme) => `1px solid ${theme.palette.text.primary}`}
      >
        名前
      </Typography>
    </Box>
    <Box>
      <Typography>（問） 次の空欄を埋めよ。</Typography>
      <Table
        sx={{
          border: (theme) => `1px solid ${theme.palette.text.primary}`,
        }}
      >
        <TableHead>
          <TableRow
            sx={{
              // height: 40,
              '& th': {
                p: 0.3,
                borderBottom: (theme) =>
                  `1px solid ${theme.palette.text.primary}`,
              },
            }}
          >
            <TableCell
              width="9%"
              sx={{
                borderRight: (theme) =>
                  `1px solid ${theme.palette.text.primary}`,
              }}
            ></TableCell>
            <TableCell
              width="30%"
              sx={{
                borderRight: (theme) =>
                  `1px solid ${theme.palette.text.primary}`,
              }}
            >
              <Typography variant="body2">英語</Typography>
            </TableCell>
            <TableCell>
              <Typography variant="body2">日本語</Typography>
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {props.words.map((v, index) => (
            <TableRow
              key={index}
              sx={{
                '& td': {
                  px: 0.8,
                  py: 1.2,
                  borderBottom: (theme) =>
                    `1px solid ${theme.palette.text.primary}`,
                },
              }}
            >
              <TableCell
                sx={{
                  borderRight: (theme) =>
                    `1px solid ${theme.palette.text.primary}`,
                }}
              >
                <Typography align="center">{index + 1}</Typography>
              </TableCell>
              <TableCell
                sx={{
                  borderRight: (theme) =>
                    `1px solid ${theme.palette.text.primary}`,
                  position: 'relative',
                }}
              >
                <Typography
                  position={v.type === 'en' ? 'absolute' : 'initial'}
                  top={0}
                  left={4}
                  variant={v.type === 'en' ? 'body2' : 'body1'}
                >
                  {v.type === 'en' ? `(${index + 1})` : v.en_title}
                </Typography>
              </TableCell>
              <TableCell
                sx={{
                  borderRight: (theme) =>
                    `1px solid ${theme.palette.text.primary}`,
                  position: 'relative',
                }}
              >
                <Typography
                  position={v.type === 'jp' ? 'absolute' : 'initial'}
                  top={0}
                  left={4}
                  variant={v.type === 'jp' ? 'body2' : 'body1'}
                >
                  {v.type === 'jp' ? `(${index + 1})` : v.jp_title}
                </Typography>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <Typography>☆2024/03/23実施</Typography>
    </Box>
  </Box>
);
