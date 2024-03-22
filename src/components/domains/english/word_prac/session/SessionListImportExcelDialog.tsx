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
import { useSessionExcelUpload } from '@/hooks/english/useSessionExcelUpload';

interface SessionListImportExcelDialogProps {
  isOpen: boolean;
  onClose: () => void;
}

export const SessionListImportExcelDialog: React.FC<
  SessionListImportExcelDialogProps
> = (props) => {
  const sessionExcelUpload = useSessionExcelUpload();
  return (
    <Dialog open={props.isOpen} onClose={props.onClose}>
      <DialogTitle variant="h5" component="h2" fontWeight="bold">
        インポートを行う
      </DialogTitle>
      <DialogContent>
        <Typography>Excelファイルをアップロードしてください。</Typography>
        <Box
          {...sessionExcelUpload.getRootProps()}
          border={(theme) => `1px solid ${theme.palette.divider}`}
          width="100%"
          p={4}
          bgcolor={sessionExcelUpload.isDragActive ? 'gray' : 'transparent'}
        >
          <input {...sessionExcelUpload.getInputProps()} />
          <Button variant="contained" component="label">
            Upload File
          </Button>
          <Typography>ここにドタッグアンドドロップ</Typography>
        </Box>
      </DialogContent>
      <DialogActions></DialogActions>
    </Dialog>
  );
};
