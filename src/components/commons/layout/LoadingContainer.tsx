import { CircularProgress, Container } from '@mui/material';
import React from 'react';

interface LoadingContainerProps {
  isLoading: boolean;
  children: React.ReactNode;
}
export const LoadingContainer: React.FC<LoadingContainerProps> = (props) => {
  if (props.isLoading) {
    return (
      <Container
        sx={{
          height: '100svh',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          position: 'fixed',
        }}
      >
        <CircularProgress />
      </Container>
    );
  }
  return props.children;
};
