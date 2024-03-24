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

export interface EnglishWordPracPrintProps {
  title: string;
  words: { en_title: string; jp_title: string; type: 'en' | 'jp' }[];
  isShowAnswer?: boolean;
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
      sx={{
        fontFamily: '"メイリオ", "Meiryo", sans-serif',
      }}
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
          （{props.words.length}問）
        </Typography>
      </Typography>
      <Box
        width="32.5%"
        height={54}
        ml={0.3}
        px={0.3}
        border={(theme) => `1px solid ${theme.palette.text.primary}`}
      >
        <Typography variant="body2" position="absolute">
          名前
        </Typography>
        {props.isShowAnswer && (
          <Typography
            color="red"
            pl={4}
            variant="h6"
            lineHeight="54px"
            fontWeight="bold"
          >
            回答例
          </Typography>
        )}
      </Box>
    </Box>
    <Box
      sx={{
        '& p': {
          fontFamily:
            '"游明朝", YuMincho, "Hiragino Mincho ProN W3", "ヒラギノ明朝 ProN W3", "Hiragino Mincho ProN", "HG明朝E", "ＭＳ Ｐ明朝", "ＭＳ 明朝", serif',
        },
      }}
    >
      <Typography lineHeight={1.5}>（問） 次の空欄を埋めよ。</Typography>
      <Table
        sx={{
          border: (theme) => `1px solid ${theme.palette.text.primary}`,
        }}
      >
        <TableHead>
          <TableRow
            sx={{
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
                  py: 0,
                  borderBottom: (theme) =>
                    `1px solid ${theme.palette.text.primary}`,
                  '& p': {
                    lineHeight: 1,
                  },
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
                <Box height={44} display="flex" alignItems="center" width={189}>
                  {v.type === 'en' && (
                    <Typography
                      position="absolute"
                      top={2}
                      left={2}
                      variant="body2"
                    >
                      ({index + 1})
                    </Typography>
                  )}

                  {(v.type !== 'en' || props.isShowAnswer) && (
                    <Typography
                      variant="h6"
                      component="p"
                      pl={props.isShowAnswer && v.type === 'en' ? 3 : 0}
                      color={
                        props.isShowAnswer && v.type === 'en'
                          ? 'red'
                          : 'initial'
                      }
                      fontWeight={
                        props.isShowAnswer && v.type === 'en'
                          ? 'bold'
                          : 'initial'
                      }
                    >
                      {v.en_title}
                    </Typography>
                  )}
                </Box>
              </TableCell>
              <TableCell
                sx={{
                  borderRight: (theme) =>
                    `1px solid ${theme.palette.text.primary}`,
                  position: 'relative',
                }}
              >
                <Box height={44} display="flex" alignItems="center">
                  {v.type === 'jp' && (
                    <Typography
                      position="absolute"
                      top={2}
                      left={2}
                      variant="body2"
                    >
                      ({index + 1})
                    </Typography>
                  )}
                  {(v.type !== 'jp' || props.isShowAnswer) && (
                    <Typography
                      variant="h6"
                      component="p"
                      pl={props.isShowAnswer && v.type === 'jp' ? 3 : 0}
                      color={
                        props.isShowAnswer && v.type === 'jp'
                          ? 'red'
                          : 'initial'
                      }
                      fontWeight={
                        props.isShowAnswer && v.type === 'jp'
                          ? 'bold'
                          : 'initial'
                      }
                    >
                      {v.jp_title}
                    </Typography>
                  )}
                </Box>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <Typography>☆2024/03/23実施</Typography>
    </Box>
  </Box>
);
