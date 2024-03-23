import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Typography,
} from '@mui/material';
import exceljs from 'exceljs';
import React from 'react';
import { useDropzone } from 'react-dropzone';
import { dropExcelData } from '@/utils/dropExcelData';

interface ImportExcelDialogProps {
  isOpen: boolean;
  onClose: () => void;
  worksheetName: string;
  processExcelData: (worksheet: exceljs.Worksheet) => Promise<void>;
}

export const ImportExcelDialog: React.FC<ImportExcelDialogProps> = (props) => {
  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop: (acceptedFiles) => {
      dropExcelData(acceptedFiles, props.worksheetName, props.processExcelData);
    },
  });

  return (
    <Dialog open={props.isOpen} onClose={props.onClose}>
      <DialogTitle variant="h5" component="h2" fontWeight="bold">
        インポートを行う
      </DialogTitle>
      <DialogContent>
        <Typography>Excelファイルをアップロードしてください。</Typography>
        <Box
          {...getRootProps()}
          border={(theme) => `1px solid ${theme.palette.divider}`}
          width="100%"
          p={4}
          bgcolor={isDragActive ? 'gray' : 'transparent'}
        >
          <input {...getInputProps()} />
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
