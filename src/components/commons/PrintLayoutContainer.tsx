import { Box, Paper } from '@mui/material';
import React from 'react';

interface PrintLayoutProps {
  /**
   * 印刷時に参照するRef要素
   */
  componentRef?: React.MutableRefObject<HTMLDivElement | null>;
  /**
   * 印刷する要素
   */
  children: React.ReactNode;
  /**
   * 印刷プレビューを表示するか
   */
  isShowPreview?: boolean;
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
    display={props.isShowPreview ? 'block' : 'none'}
  >
    <Box ref={props.componentRef}>{props.children}</Box>
  </Paper>
);
