import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Typography,
} from '@mui/material';
import React from 'react';
import { DropzoneState } from 'react-dropzone';

interface ImportExcelDialogProps {
  isOpen: boolean;
  onClose: () => void;
  dropzone: DropzoneState;
}

export const ImportExcelDialog: React.FC<ImportExcelDialogProps> = (props) => (
  <Dialog open={props.isOpen} onClose={props.onClose}>
    <DialogTitle variant="h5" component="h2" fontWeight="bold">
      インポートを行う
    </DialogTitle>
    <DialogContent>
      <Typography>Excelファイルをアップロードしてください。</Typography>
      <Box
        {...props.dropzone.getRootProps()}
        border={(theme) => `1px solid ${theme.palette.divider}`}
        width="100%"
        p={4}
        bgcolor={props.dropzone.isDragActive ? 'gray' : 'transparent'}
      >
        <input {...props.dropzone.getInputProps()} />
        <Button variant="contained" component="label">
          Upload File
        </Button>
        <Typography>ここドラッグアンドドロップ</Typography>
      </Box>
    </DialogContent>
    <DialogActions></DialogActions>
  </Dialog>
);
