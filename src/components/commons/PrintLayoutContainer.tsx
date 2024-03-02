import { Box, Paper } from '@mui/material';
import React from 'react';

interface PrintLayoutProps {
  componentRef: React.MutableRefObject<HTMLDivElement | null>;
  children: React.ReactNode;
}

/**
 * プリントを行う際のコンテナ
 */
export const PrintLayoutContainer: React.FC<PrintLayoutProps> = (props) => (
  <Paper component={Box} maxWidth={758}>
    <Box ref={props.componentRef} maxWidth={758} minHeight={1080}>
      {props.children}
    </Box>
  </Paper>
);
