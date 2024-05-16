import { createTheme } from '@mui/material';

export const lightTheme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: '#EFE2CD',
    },
    error: {
      main: '#FFD0D0',
    },
    background: {
      default: '#f5f5f5',
      paper: '#fff',
    },
  },
});

export const darkTheme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#a98c5e',
    },
    error: {
      main: '#705151',
    },
    background: {
      default: '#333',
      paper: '#111',
    },
  },
});
