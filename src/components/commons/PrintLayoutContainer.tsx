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
  <Paper
    component={Box}
    maxWidth={758}
    minWidth={758}
    minHeight={1080}
    maxHeight={1080}
  >
    <Box ref={props.componentRef}>{props.children}</Box>
  </Paper>
);
