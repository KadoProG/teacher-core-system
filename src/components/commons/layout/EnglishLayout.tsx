'use client';
import { Box, CssBaseline } from '@mui/material';
import React from 'react';
import { EnglishLayoutPCDrawer } from '@/components/commons/layout/EnglishLayoutPCDrawer';
import { EnglishLayoutSmartphone } from '@/components/commons/layout/EnglishLayoutSmartphone';

export const EnglishLayout = (props: { children: React.ReactNode }) => (
  <EnglishLayoutSmartphone>
    <Box pr={0} display="flex" maxWidth="100%">
      <CssBaseline />
      <EnglishLayoutPCDrawer />
      <Box flexGrow={1} maxWidth="100%">
        {props.children}
      </Box>
    </Box>
  </EnglishLayoutSmartphone>
);
