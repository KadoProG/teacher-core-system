'use client';

import { Box } from '@mui/material';
import React from 'react';
import { DialogFrame } from '@/components/commons/surfaces/DialogFrame';

export type ConfirmDialogContextProps = {
  /**タイトル */
  title: string;
  /**キャンセルボタンのテキスト */
  negativeButtonText: string;
  /**Acceptボタンのテキスト */
  positiveButtonText: string;
  /**フォームの内容 説明 */
  children: React.ReactNode;
};

export type ConfirmDialogContextType = ConfirmDialogContextProps & {
  /**
   * @param props ダイアログを起動する際に必要な引数
   * @returns isAccepted OKだったらtrue
   */
  confirmDialog: (
    props: ConfirmDialogContextProps
  ) => Promise<{ isAccepted: boolean }>;
};

export const ConfirmDialogContext =
  React.createContext<ConfirmDialogContextType>({
    title: '',
    negativeButtonText: '',
    positiveButtonText: '',
    children: null,
    confirmDialog: async () => ({ isAccepted: false }), // ダミー関数
  });

export const ConfirmDialogProvider: React.FC<{ children: React.ReactNode }> = (
  props
) => {
  const context = React.useContext(ConfirmDialogContext);

  const [title, setTitle] = React.useState<string>(context.title);
  const [negativeButtonText, setNegativeButtonText] = React.useState<string>(
    context.negativeButtonText
  );
  const [positiveButtonText, setPositiveButtonText] = React.useState<string>(
    context.positiveButtonText
  );
  const [children, setChildren] = React.useState<React.ReactNode>(null);

  // resolveのグローバル関数化
  const resolveFunction =
    React.useRef<(value: { isAccepted: boolean }) => void>();

  /**
   * コンテキストオブジェクトに自分自身の値を変更する関数をセットする
   */
  const newContext = React.useMemo<
    ConfirmDialogContextType & {
      resolveConfirmDialog: (value: { isAccepted: boolean }) => void;
    }
  >(
    () => ({
      title,
      negativeButtonText,
      positiveButtonText,
      children,
      confirmDialog: async (confirmDialogProps) =>
        new Promise((resolve) => {
          resolveFunction.current = resolve;
          setTitle(confirmDialogProps.title);
          setNegativeButtonText(confirmDialogProps.negativeButtonText);
          setPositiveButtonText(confirmDialogProps.positiveButtonText);
          setChildren(confirmDialogProps.children);
        }),
      // handleClose内でresolveを呼び出すための関数を提供
      resolveConfirmDialog: (value: { isAccepted: boolean }) => {
        if (resolveFunction.current) {
          resolveFunction.current(value);
        }
      },
    }),
    [children, negativeButtonText, positiveButtonText, title]
  );

  /**
   * 画面クローズ（キャンセル）
   */
  const handleCancel = React.useCallback(() => {
    setTitle(''); // 画面を閉じる
    newContext.resolveConfirmDialog({ isAccepted: false }); // resolveを実行
  }, [newContext]);

  /**
   * 画面クローズ（OK）
   */
  const handleAccept = React.useCallback(() => {
    setTitle(''); // 画面を閉じる
    newContext.resolveConfirmDialog({ isAccepted: true }); // resolveを実行
  }, [newContext]);

  return (
    <ConfirmDialogContext.Provider value={newContext}>
      {props.children}
      <DialogFrame
        isOpen={newContext.title !== ''}
        handleClose={handleCancel}
        title={newContext.title}
        labelPrefix="applicant_confirm"
        negativeButtonAction={handleCancel}
        negativeButtonText={newContext.negativeButtonText}
        positiveButtonAction={handleAccept}
        positiveButtonText={newContext.positiveButtonText}
      >
        <Box my={3}>{newContext.children}</Box>
      </DialogFrame>
    </ConfirmDialogContext.Provider>
  );
};

/**
 * SnackbarContext を簡単に使うためのユーティリティ関数
 * @returns confirmDialog関数を返す
 *
 * confirmDialog関数は引数にConfirmDialogContextPropsを取り、Promise<{ isAccepted: boolean }>を返す
 */
export function useConfirmDialog() {
  return React.useContext(ConfirmDialogContext);
}
