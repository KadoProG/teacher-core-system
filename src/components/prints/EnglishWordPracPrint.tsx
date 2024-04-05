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

const customCorderColor = '1px solid black';

interface EnglishWordPracPrint {
  print: IEnglishWordPracPrint;
}

/**
 * # 単語テスト
 */
export const EnglishWordPracPrint: React.FC<EnglishWordPracPrint> = (props) => (
  <Box
    px={5}
    pt={5}
    position="relative"
    height={1080}
    bgcolor="#fff"
    color="#000"
  >
    <Box
      border={customCorderColor}
      display="flex"
      alignItems="center"
      p={0.3}
      sx={{
        fontFamily: '"メイリオ", "Meiryo", sans-serif',
      }}
    >
      <Typography
        color="initial"
        flex={1}
        height={54}
        px={0.3}
        lineHeight="54px"
        border={customCorderColor}
      >
        {props.print.title}
        <Typography variant="body2" component="span">
          （{props.print.words.length}問）
        </Typography>
      </Typography>
      <Box
        width="32.5%"
        height={54}
        ml={0.3}
        px={0.3}
        border={customCorderColor}
      >
        <Typography variant="body2" position="absolute" color="initial">
          名前
        </Typography>
        {props.print.isShowAnswer && (
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
      <Typography lineHeight={1.5} color="initial">
        （問） 次の空欄を埋めよ。
      </Typography>
      <Table
        sx={{
          border: customCorderColor,
        }}
      >
        <TableHead>
          <TableRow
            sx={{
              '& th': {
                p: 0.3,
                borderBottom: customCorderColor,
              },
            }}
          >
            <TableCell
              width="9%"
              sx={{
                borderRight: customCorderColor,
              }}
            ></TableCell>
            <TableCell
              width="30%"
              sx={{
                borderRight: customCorderColor,
              }}
            >
              <Typography variant="body2" color="initial">
                英語
              </Typography>
            </TableCell>
            <TableCell>
              <Typography variant="body2" color="initial">
                日本語
              </Typography>
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {props.print.words.map((v, index) => (
            <TableRow
              key={index}
              sx={{
                '& td': {
                  px: 0.8,
                  py: 0,
                  borderBottom: customCorderColor,
                  '& p': {
                    lineHeight: 1,
                  },
                },
              }}
            >
              <TableCell
                sx={{
                  borderRight: customCorderColor,
                }}
              >
                <Typography align="center" color="initial">
                  {index + 1}
                </Typography>
              </TableCell>
              <TableCell
                sx={{
                  borderRight: customCorderColor,
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
                      color="initial"
                    >
                      ({index + 1})
                    </Typography>
                  )}

                  {(v.type !== 'en' || props.print.isShowAnswer) && (
                    <Typography
                      variant="h6"
                      component="p"
                      pl={props.print.isShowAnswer && v.type === 'en' ? 3 : 0}
                      color={
                        props.print.isShowAnswer && v.type === 'en'
                          ? 'red'
                          : 'initial'
                      }
                      fontWeight={
                        props.print.isShowAnswer && v.type === 'en'
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
                  borderRight: customCorderColor,
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
                      color="initial"
                    >
                      ({index + 1})
                    </Typography>
                  )}
                  {(v.type !== 'jp' || props.print.isShowAnswer) && (
                    <Typography
                      variant="h6"
                      component="p"
                      pl={props.print.isShowAnswer && v.type === 'jp' ? 3 : 0}
                      color={
                        props.print.isShowAnswer && v.type === 'jp'
                          ? 'red'
                          : 'initial'
                      }
                      fontWeight={
                        props.print.isShowAnswer && v.type === 'jp'
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
      <Typography color="initial">☆2024/03/23実施</Typography>
    </Box>
  </Box>
);
