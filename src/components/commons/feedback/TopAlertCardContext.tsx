'use client';

import { Alert, AlertColor, Box, Stack } from '@mui/material';
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
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  addTopAlertCard: (message: string, color: AlertColor) => {}, // ダミー関数
});

interface TopAlertCardProviderProps {
  children: React.ReactNode;
}

// @keyframesアニメーションを定義
const keyframes = {
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

export const TopAlertCardProvider: React.FC<TopAlertCardProviderProps> = (
  props
) => {
  const context = React.useContext(TopAlertCardContext);

  const [messageObjects, setMessageObjects] = React.useState<
    { message: string; color: AlertColor }[]
  >(context.messageObjects);

  const newContext: TopAlertCardContextType = React.useMemo(
    () => ({
      messageObjects,
      addTopAlertCard: (message: string, color: AlertColor) => {
        const newMessageObject: { message: string; color: AlertColor } = {
          message,
          color,
        };
        setMessageObjects([...messageObjects, newMessageObject]);
      },
    }),
    [messageObjects]
  );

  return (
    <TopAlertCardContext.Provider value={newContext}>
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

/**
 * TopAlertCardContextを使用するためのコンシューマーコンポーネント
 * - アラートを表示する
 */
export const TopAlertCardConsumer = () => (
  <TopAlertCardContext.Consumer>
    {(context) => (
      <Box p={2}>
        <Stack spacing={1}>
          {context.messageObjects.map((v, i) => (
            <Alert key={i} color={v.color} sx={keyframes} severity={v.color}>
              {v.message}
            </Alert>
          ))}
        </Stack>
      </Box>
    )}
  </TopAlertCardContext.Consumer>
);
