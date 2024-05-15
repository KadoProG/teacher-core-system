'use client';
import { Box, Container, CssBaseline } from '@mui/material';
import React from 'react';
import { TopAlertCardConsumer } from '@/components/commons/feedback/TopAlertCardContext';
import { EnglishLayoutPCDrawer } from '@/components/commons/layout/EnglishLayoutPCDrawer';
import { EnglishLayoutSmartphone } from '@/components/commons/layout/EnglishLayoutSmartphone';

export const EnglishLayout = (props: { children: React.ReactNode }) => (
  <EnglishLayoutSmartphone>
    <Box pr={0} display="flex">
      <CssBaseline />
      <EnglishLayoutPCDrawer />
      <Container component={Box} flexGrow={1} p={2}>
        <TopAlertCardConsumer />
        {props.children}
      </Container>
    </Box>
  </EnglishLayoutSmartphone>
);
