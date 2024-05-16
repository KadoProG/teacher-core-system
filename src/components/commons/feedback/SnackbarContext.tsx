'use client';

import { Alert, AlertColor, Box, Stack } from '@mui/material';
import React from 'react';

interface SnackbarContextType {
  messageObjects: { message: string; color: AlertColor }[];
  addMessageObject: (message: string, color: AlertColor) => void;
}

const SnackbarContext = React.createContext<SnackbarContextType>({
  messageObjects: [],
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  addMessageObject: (message: string, color: AlertColor) => {}, // ダミー関数
});

interface SnackbarProviderProps {
  children: React.ReactNode;
}

// @keyframesアニメーションを定義
const keyframes = {
  animation: 'dialog__message_p 7s forwards',
  '@keyframes dialog__message_p': {
    '0%': {
      transform: 'translateY(120%)',
    },
    '5%': {
      transform: 'translateY(0)',
    },
    '95%': {
      transform: 'translateY(0)',
      position: 'initial',
    },
    '100%': {
      transform: 'translateY(120%)',
      position: 'absolute',
      bottom: 0,
    },
  },
};

export const SnackbarProvider: React.FC<SnackbarProviderProps> = (props) => {
  const context = React.useContext(SnackbarContext);

  const [messageObjects, setMessageObjects] = React.useState<
    { message: string; color: AlertColor }[]
  >(context.messageObjects);

  const newContext: SnackbarContextType = React.useMemo(
    () => ({
      messageObjects,
      addMessageObject: (message: string, color: AlertColor) => {
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
    <SnackbarContext.Provider value={newContext}>
      {props.children}
      <Box position="fixed" bottom={0} left={0} zIndex={10000} p={2}>
        <Stack spacing={1}>
          {messageObjects.map((v, i) => (
            <Alert
              key={i}
              color={v.color}
              sx={keyframes}
              className="dialog__message_p"
              severity={v.color}
            >
              {v.message}
            </Alert>
          ))}
        </Stack>
      </Box>
    </SnackbarContext.Provider>
  );
};

export const useSnackbar = (): SnackbarContextType =>
  React.useContext(SnackbarContext);
