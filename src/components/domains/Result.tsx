'use client';
import { Box, Button, Divider, Typography } from '@mui/material';
import React from 'react';
import { useReactToPrint } from 'react-to-print';
import { PrintLayoutContainer } from '@/components/commons/PrintLayoutContainer';

/**
 * 印刷時のスタイル設定（印刷仕様に応じてスタイリングを調整します）
 * 　NOTE
 * 　・背景色/背景画像を表示させる設定（Chrome）：-webkit-print-color-adjust: exact
 * 　・pageのmargin指定でプレビュー時にデフォルト表示されるURLと時刻（ヘッダーとフッター）を表示エリアから外している
 *  https://zenn.dev/ikefukurou777/articles/606bf9f02cee7d より
 */
const pageStyle = `
    @page { 
      size: auto;
      margin: 5mm;
    }
    
    @media print {
      body { -webkit-print-color-adjust: exact; }
      table { break-after: auto; }
      tr    { break-inside:avoid; break-after:auto }
      td    { break-inside:avoid; break-after:auto }
    }
  `;

export const Result = () => {
  const componentRef = React.useRef<HTMLDivElement>(null);

  /**
   * 印刷対象のコンポーネントを設定します
   */
  const reactToPrintContent = React.useCallback(() => {
    if (!componentRef.current) return null;
    return componentRef.current;
  }, []);

  const handlePrint = useReactToPrint({
    pageStyle, // 印刷のスタイリングを指定
    content: reactToPrintContent, // 印刷エリアを指定
    removeAfterPrint: true, // 印刷後に印刷用のiframeを削除する
  });

  return (
    <Box>
      こんにちは
      <Button onClick={handlePrint} variant="contained">
        印刷しちゃう
      </Button>
      <PrintLayoutContainer componentRef={componentRef}>
        <Box px={10} position="relative" height={1080}>
          <Box py={2} height={80}>
            <Typography align="right" fontStyle="italic">
              個別〇〇のトライ　郡山駅前校
            </Typography>
            <Typography align="right" fontStyle="italic">
              高校入試特訓2023　英語編
            </Typography>
          </Box>
          <Typography
            component="h2"
            variant="h6"
            align="center"
            fontWeight="bold"
            py={2}
            sx={{ textDecoration: 'underline' }}
          >
            高校入試特訓　英語編　　単語・熟語テスト（後半戦報告）
          </Typography>
          <Box width={300} ml="auto" py={2}>
            <Typography display="flex">
              <Typography fontWeight="bold" component="span">
                名前
              </Typography>
              <Typography
                flex={1}
                align="center"
                fontWeight="bold"
                component="span"
              >
                NaN undefined
              </Typography>
            </Typography>
            <Divider />
          </Box>
          <Box>
            <Typography py={2}>
              こんにちは。Kadoです。後半戦報告をします。本番へ行ってらっしゃい。
            </Typography>
          </Box>

          <Divider />
          <Box py={2}>
            <Typography variant="h6" fontWeight="bold">
              単語テスト
            </Typography>
            <Box display="flex" flexWrap="wrap" pb={2}>
              {[1, 2, 3, 4, 5].map((v) => (
                <Box
                  position="relative"
                  key={v}
                  minWidth="20%"
                  borderTop="1px solid black"
                  borderBottom="1px solid black"
                  borderLeft="1px solid black"
                  sx={{
                    '&:last-child': {
                      borderRight: '1px solid black',
                    },
                  }}
                >
                  <Typography align="center" borderBottom="1px solid black">
                    単語A
                  </Typography>
                  <Box>
                    <Typography align="center" px={2} py={2}>
                      16
                    </Typography>
                  </Box>
                  <Typography
                    position="absolute"
                    bottom={0}
                    right={0}
                    variant="body2"
                  >
                    (満点:16)
                  </Typography>
                </Box>
              ))}
            </Box>
            <Box display="flex" flexWrap="wrap" pb={2}>
              {[1, 2, 3, 4, 5].map((v) => (
                <Box
                  position="relative"
                  key={v}
                  minWidth="20%"
                  borderTop="1px solid black"
                  borderBottom="1px solid black"
                  borderLeft="1px solid black"
                  sx={{
                    '&:last-child': {
                      borderRight: '1px solid black',
                    },
                  }}
                >
                  <Typography align="center" borderBottom="1px solid black">
                    単語A
                  </Typography>
                  <Box>
                    <Typography align="center" px={2} py={2}>
                      16
                    </Typography>
                  </Box>
                  <Typography
                    position="absolute"
                    bottom={0}
                    right={0}
                    variant="body2"
                  >
                    (満点:16)
                  </Typography>
                </Box>
              ))}
            </Box>
          </Box>
          <Box py={2}>
            <Typography variant="h6" fontWeight="bold">
              熟語テスト
            </Typography>
            <Box display="flex" flexWrap="wrap" pb={2}>
              {[1, 2, 3, 4].map((v) => (
                <Box
                  position="relative"
                  key={v}
                  minWidth="20%"
                  borderTop="1px solid black"
                  borderBottom="1px solid black"
                  borderLeft="1px solid black"
                  sx={{
                    '&:last-child': {
                      borderRight: '1px solid black',
                    },
                  }}
                >
                  <Typography align="center" borderBottom="1px solid black">
                    単語A
                  </Typography>
                  <Box>
                    <Typography align="center" px={2} py={2}>
                      16
                    </Typography>
                  </Box>
                  <Typography
                    position="absolute"
                    bottom={0}
                    right={0}
                    variant="body2"
                  >
                    (満点:16)
                  </Typography>
                </Box>
              ))}
            </Box>
          </Box>
          <Box py={2}>
            <Typography variant="h6" fontWeight="bold">
              総合順位
            </Typography>
            <Box display="flex" flexWrap="wrap" pb={2}>
              {[1, 2, 3, 4].map((v) => (
                <Box
                  position="relative"
                  key={v}
                  minWidth="20%"
                  borderTop="1px solid black"
                  borderBottom="1px solid black"
                  borderLeft="1px solid black"
                  sx={{
                    '&:last-child': {
                      borderRight: '1px solid black',
                    },
                  }}
                >
                  <Typography align="center" borderBottom="1px solid black">
                    単語A
                  </Typography>
                  <Box>
                    <Typography align="center" px={2} py={2}>
                      16
                    </Typography>
                  </Box>
                  <Typography
                    position="absolute"
                    bottom={0}
                    right={0}
                    variant="body2"
                  >
                    (満点:16)
                  </Typography>
                </Box>
              ))}
            </Box>
          </Box>
          <Typography align="right" fontWeight="bold">
            2024/02/29現在
          </Typography>
          <Box py={2} height={80} position="absolute" bottom={0}>
            ここがﾌｯﾀ
          </Box>
        </Box>
      </PrintLayoutContainer>
    </Box>
  );
};
