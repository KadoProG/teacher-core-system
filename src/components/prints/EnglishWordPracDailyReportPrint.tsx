import { Box, Divider, Typography } from '@mui/material';

/**
 * # 単語テストの報告書
 */
export const EnglishWordPracDailyReportPrint = () => (
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
        <Typography flex={1} align="center" fontWeight="bold" component="span">
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
);
