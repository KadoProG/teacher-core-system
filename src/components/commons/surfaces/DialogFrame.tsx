'use client';

import { Close } from '@mui/icons-material';
import {
  DialogTitle,
  Dialog,
  DialogContent,
  DialogActions,
  IconButton,
  Button,
  Divider,
  Box,
  Typography,
  DialogProps,
} from '@mui/material';
import React, { ReactNode } from 'react';

export interface DialogFrameProps {
  /**ダイアログの開閉状態 */
  isOpen: boolean;
  /**ダイアログのタイトル */
  title: string;
  /**ダイアログを閉じる関数 */
  handleClose: () => void;
  /**ダイアログのメインコンテンツ */
  children: ReactNode;
  /**各ダイアログ要素のラベル要素に付与するプレフィックス */
  labelPrefix: string;
  /**ダイアログ下部の左ボタンテキスト（キャンセル系の動作する想定） */
  negativeButtonText?: string;
  /**ダイアログ下部の左ボタンアクション（キャンセル系の動作する想定） */
  negativeButtonAction?: (() => void) | (() => Promise<void>);
  /**ダイアログ下部の左ボタンテキスト */
  positiveButtonText?: string;
  /**ダイアログ下部の右ボタンアクション */
  positiveButtonAction?: (() => void) | (() => Promise<void>);
  /**2つのボタンのdisable状態制御 */
  isButtonsDisable?: boolean;

  maxWidth?: DialogProps['maxWidth'];
}

export const DialogFrame: React.FC<DialogFrameProps> = (props) => (
  <Dialog
    open={props.isOpen}
    onClose={props.handleClose}
    aria-labelledby={`${props.labelPrefix}-dialog-title`}
    aria-describedby={`${props.labelPrefix}-dialog-description`}
    fullWidth
    maxWidth={props.maxWidth ?? 'sm'}
  >
    {/* ダイアログ上部のタイトル部分 */}
    <DialogTitle id={`${props.labelPrefix}-dialog-title`}>
      <Box
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        my={1}
      >
        <Typography variant="h6" component="h2" fontWeight="bold">
          {props.title}
        </Typography>
        {/* 右上の 閉じる ボタン */}
        <IconButton onClick={props.handleClose}>
          <Close />
        </IconButton>
      </Box>
      <Divider />
    </DialogTitle>

    {/* ダイアログ中央のコンテンツ（引数として） */}
    <DialogContent>
      <Box>{props.children}</Box>
    </DialogContent>

    <Divider sx={{ mx: 3 }} />

    {/* ダイアログ下部のボタン部分 */}
    <DialogActions sx={{ justifyContent: 'center' }}>
      <Box display="flex" justifyContent="center">
        <Box display="flex" justifyContent="center" my={1}>
          <Button
            variant="outlined"
            color="inherit"
            onClick={props.negativeButtonAction}
            disabled={props.isButtonsDisable}
            size="large"
            sx={{ borderColor: (theme) => theme.palette.divider, m: 1, px: 4 }}
          >
            {props.negativeButtonText}
          </Button>
          <Button
            variant="contained"
            size="large"
            onClick={props.positiveButtonAction}
            disabled={props.isButtonsDisable}
            disableElevation
            sx={{ m: 1, px: 4 }}
          >
            {props.positiveButtonText}
          </Button>
        </Box>
      </Box>
    </DialogActions>
  </Dialog>
);
