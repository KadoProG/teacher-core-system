'use client';
import MenuIcon from '@mui/icons-material/Menu';
import {
  AppBar,
  Box,
  Button,
  CssBaseline,
  IconButton,
  Toolbar,
} from '@mui/material';
import Link from 'next/link';
import React from 'react';
import { EnglishLayoutRightDrawer } from '@/components/commons/layout/EnglishLayoutRightDrawer';
import { EnglishLayoutToolbar } from '@/components/commons/layout/EnglishLayoutToolbar';

export const EnglishLayout = (props: { children: React.ReactNode }) => {
  const [isRightDrawerOpen, setIsRightDrawerOpen] =
    React.useState<boolean>(false);

  return (
    <Box pr={0}>
      <CssBaseline />
      <AppBar sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}>
        <Toolbar
          variant="dense"
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
          }}
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
          <IconButton onClick={() => setIsRightDrawerOpen(true)}>
            <MenuIcon />
          </IconButton>
        </Toolbar>
        <EnglishLayoutRightDrawer
          isOpen={isRightDrawerOpen}
          onClose={() => setIsRightDrawerOpen(false)}
        />
      </AppBar>
      <Box>
        <EnglishLayoutToolbar />
        {props.children}
      </Box>
    </Box>
  );
};
