'use client';

import { Alert, AlertColor, Stack, SxProps } from '@mui/material';
import { usePathname } from 'next/navigation';
import React from 'react';

interface TopAlertCardContextType {
  messageObjects: { message: string; color: AlertColor }[];
  addTopAlertCard: (message: string, color: AlertColor) => void;
}

/**
 * 常駐のアラートを表示するためのコンテキスト
 */
const TopAlertCardContext = React.createContext<TopAlertCardContextType>({
  messageObjects: [],
  addTopAlertCard: () => {}, // ダミー関数
});

interface TopAlertCardProviderProps {
  children: React.ReactNode;
}

export const TopAlertCardProvider: React.FC<TopAlertCardProviderProps> = (
  props
) => {
  const [messageObjects, setMessageObjects] = React.useState<
    { message: string; color: AlertColor }[]
  >([]);

  const pathname = usePathname();

  const addTopAlertCard = React.useCallback(
    (message: string, color: AlertColor) => {
      setMessageObjects((prev) => [...prev, { message, color }]);
    },
    []
  );

  React.useEffect(() => {
    setMessageObjects([]);
  }, [pathname]);

  const contextValue = React.useMemo(
    () => ({
      messageObjects,
      addTopAlertCard,
    }),
    [messageObjects, addTopAlertCard]
  );

  return (
    <TopAlertCardContext.Provider value={contextValue}>
      {props.children}
    </TopAlertCardContext.Provider>
  );
};

/**
 * TopAlertCardContextを使用するためのカスタムフック
 * - addTopAlertCard メソッドを使用して、アラートを追加する
 */
export const useTopAlertCard = (): TopAlertCardContextType =>
  React.useContext(TopAlertCardContext);

// Keyframes animation for alerts
const alertAnimation: SxProps = {
  animation: 'top-alert-card__message 0.3s forwards',
  '@keyframes top-alert-card__message': {
    '0%': {
      transform: 'translateY(100%)',
    },
    '100%': {
      transform: 'translateY(0)',
    },
  },
};

/**
 * TopAlertCardContextを使用するためのコンシューマーコンポーネント
 * - アラートを表示する
 */
export const TopAlertCardConsumer: React.FC = () => {
  const { messageObjects } = React.useContext(TopAlertCardContext);

  return (
    <Stack spacing={1} pb={messageObjects.length !== 0 ? 2 : 0}>
      {messageObjects.map((v, i) => (
        <Alert key={i} color={v.color} sx={alertAnimation} severity={v.color}>
          {v.message}
        </Alert>
      ))}
    </Stack>
  );
};
