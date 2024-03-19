'use client';

import { Box, Stack } from '@mui/material';
import React from 'react';
import { SessionList } from '@/components/domains/english/word_prac/session/SessionList';

export const EnglishWordPracSessionPage: React.FC = () => (
  <Box p={2} component={Stack} spacing={2}>
    <SessionList />
  </Box>
);
