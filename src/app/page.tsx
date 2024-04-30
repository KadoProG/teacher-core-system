import { Box, Button, Chip, Stack, Typography } from '@mui/material';
import Link from 'next/link';

const paths = [
  { title: '画面', path: '/' },
  { title: '印刷プレビューリスト画面', path: '/english' },
  { title: '単語リスト画面', path: '/english/word_prac' },
  { title: 'セッションリスト画面', path: '/english/word_prac/session' },
  { title: '印刷アーカイブ画面', path: '/english/word_prac/print' },
];

const Page = () => (
  <Box
    display="flex"
    justifyContent="center"
    alignItems="center"
    height="100svh"
  >
    <Box>
      <Typography variant="h5" fontWeight="bold">
        画面リスト
      </Typography>
      <Stack spacing={1}>
        {paths.map((path) => (
          <Box key={path.path + path.title}>
            <Button
              variant="outlined"
              color="inherit"
              component={Link}
              href={path.path}
            >
              {path.title}
              <Chip label={path.path} />
            </Button>
          </Box>
        ))}
      </Stack>
    </Box>
  </Box>
);
export default Page;
