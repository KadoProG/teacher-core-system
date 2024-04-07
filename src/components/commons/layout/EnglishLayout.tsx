'use client';

import { AppBar, Box, Button, CssBaseline, Toolbar } from '@mui/material';
import Link from 'next/link';
import React from 'react';

export const EnglishLayout = (props: { children: React.ReactNode }) => (
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
        <Button color="inherit" variant="outlined" size="small">
          ログアウト
        </Button>
      </Toolbar>
    </AppBar>
    <Box>
      <EnglishLayoutToolbar />
      {props.children}
    </Box>
  </Box>
);

export const EnglishLayoutToolbar = (props: { children?: React.ReactNode }) => (
  <Toolbar variant="dense">{props.children}</Toolbar>
);
