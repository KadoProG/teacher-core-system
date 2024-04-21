'use client';

import { useMediaQuery } from '@mui/material';
import CssBaseline from '@mui/material/CssBaseline';
import { ThemeProvider } from '@mui/material/styles';
import * as React from 'react';
import { LoadingContainer } from '@/components/commons/layout/LoadingContainer';
import { darkTheme, lightTheme } from '@/libs/theme/theme';

const ColorModeContext = React.createContext({ toggleColorMode: () => {} });

export const ThemeRegistry = (props: { children: React.ReactNode }) => {
  const prefersInit = useMediaQuery('(prefers-color-scheme: dark)')
    ? 'dark'
    : 'light';

  const [mode, setMode] = React.useState<'light' | 'dark'>(prefersInit);

  const colorMode = React.useMemo(
    () => ({
      toggleColorMode: () => {
        setMode((prevMode) => (prevMode === 'light' ? 'dark' : 'light'));
      },
    }),
    []
  );

  const [mounted, setMounted] = React.useState<boolean>(false);

  React.useEffect(() => {
    setMounted(true);
  }, []);

  React.useEffect(() => {
    setMode(prefersInit);
  }, [prefersInit]);

  const theme = React.useMemo(
    () => (mode === 'light' ? lightTheme : darkTheme),
    [mode]
  );

  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        <LoadingContainer isLoading={!mounted}>
          <CssBaseline />
          {props.children}
        </LoadingContainer>
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
};
