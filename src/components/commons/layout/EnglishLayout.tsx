'use client';

import { AppBar, Box, Button, CssBaseline, Toolbar } from '@mui/material';
import Link from 'next/link';
import { signIn, signOut, useSession } from 'next-auth/react';
import React from 'react';
import { EnglishLayoutToolbar } from '@/components/commons/layout/EnglishLayoutToolbar';

export const EnglishLayout = (props: { children: React.ReactNode }) => {
  const { data: session } = useSession();

  return (
    <Box>
      <CssBaseline />
      <AppBar sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}>
        <Toolbar
          variant="dense"
          sx={{ display: 'flex', justifyContent: 'space-between' }}
        >
          <Box>
            <Button
              color="inherit"
              component={Link}
              href="/english/word_prac"
              size="small"
            >
              単語リスト
            </Button>
            <Button
              color="inherit"
              component={Link}
              href="/english/word_prac/print"
              size="small"
            >
              印刷アーカイブ
            </Button>
          </Box>
          <Button
            color="inherit"
            variant="outlined"
            size="small"
            onClick={() => (session?.user ? signOut() : signIn())}
          >
            {session?.user ? 'ログアウト' : 'ログイン'}
          </Button>
        </Toolbar>
      </AppBar>
      <Box>
        <EnglishLayoutToolbar />
        {props.children}
      </Box>
    </Box>
  );
};
