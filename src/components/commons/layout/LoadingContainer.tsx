import { Box, CircularProgress } from '@mui/material';
import React from 'react';

interface LoadingContainerProps {
  isLoading: boolean;
  children: React.ReactNode;
}
export const LoadingContainer: React.FC<LoadingContainerProps> = (props) => (
  <>
    {props.isLoading && (
      <Box
        width="100%"
        height="100%"
        display="flex"
        justifyContent="center"
        alignItems="center"
        position="fixed"
        zIndex={(theme) => theme.zIndex.drawer + 2}
        bgcolor="var(--init-background)"
      >
        <CircularProgress />
      </Box>
    )}
    {props.children}
  </>
);
