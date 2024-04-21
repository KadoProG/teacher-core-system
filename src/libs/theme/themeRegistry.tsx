'use client';

import { PaletteMode, useMediaQuery } from '@mui/material';
import CssBaseline from '@mui/material/CssBaseline';
import { ThemeProvider } from '@mui/material/styles';
import Cookies from 'js-cookie';
import * as React from 'react';
import { LoadingContainer } from '@/components/commons/layout/LoadingContainer';
import { NextAppDirEmotionCacheProvider } from '@/libs/theme/EmotionCache';
import { darkTheme, lightTheme } from '@/libs/theme/theme';

/**カラーモードの選択オプション */
export type ColorModeChoice = 'light' | 'dark' | 'device';

interface ColorModeContextType {
  /**選択中のカラーモード */
  selectedMode: ColorModeChoice;
  /**カラーモードを設定する関数 */
  toggleColorMode: (colorMode: ColorModeChoice) => void;
}

/**カラーモードのコンテキスト */
const ColorModeContext = React.createContext<ColorModeContextType>({
  selectedMode: 'light', // 仮の設定
  toggleColorMode: (colorMode: ColorModeChoice) => {
    colorMode; // 仮の設定
  },
});

export const ThemeRegistry = (props: {
  children: React.ReactNode;
  initColorMode: ColorModeChoice;
}) => {
  const prefersInit = useMediaQuery('(prefers-color-scheme: dark)')
    ? 'dark'
    : 'light';
  // ユーザが選択しているカラーモード
  const [selectedMode, setSelectedMode] = React.useState<ColorModeChoice>(
    props.initColorMode
  );

  /** 適用されるカラーモードの設定 */
  const mode = React.useMemo<PaletteMode>(
    () => (selectedMode !== 'device' ? selectedMode : prefersInit),
    [prefersInit, selectedMode]
  );

  // コンテキストの指定（他のコンポーネントでも呼び出して使えるように）
  const colorMode = React.useMemo(
    () => ({
      selectedMode,
      toggleColorMode: (colorMode: ColorModeChoice) => {
        Cookies.set('colorMode', colorMode);
        setSelectedMode(colorMode);
      },
    }),
    [selectedMode]
  );

  // ロード時にLoading画面を表示する
  const [mounted, setMounted] = React.useState<boolean>(false);

  React.useEffect(() => {
    setMounted(true);
  }, []);

  const theme = React.useMemo(
    () => (mode === 'light' ? lightTheme : darkTheme),
    [mode]
  );

  return (
    <NextAppDirEmotionCacheProvider options={{ key: 'mui' }}>
      <ColorModeContext.Provider value={colorMode}>
        <ThemeProvider theme={theme}>
          <LoadingContainer isLoading={!mounted}>
            <CssBaseline />
            {props.children}
          </LoadingContainer>
        </ThemeProvider>
      </ColorModeContext.Provider>
    </NextAppDirEmotionCacheProvider>
  );
};

/**ColorModeContextを簡単に使うためのユーティリティ関数 */
export const useColorModeContext = (): ColorModeContextType =>
  React.useContext(ColorModeContext);
