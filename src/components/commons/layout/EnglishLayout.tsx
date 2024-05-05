'use client';
import { Box, CssBaseline } from '@mui/material';
import React from 'react';
import { EnglishLayoutDrawer } from '@/components/commons/layout/EnglishLayoutDrawer';

export const EnglishLayout = (props: { children: React.ReactNode }) => (
  <Box pr={0} display="flex">
    <CssBaseline />
    <EnglishLayoutDrawer />
    <Box flexGrow={1}>{props.children}</Box>
  </Box>
);
