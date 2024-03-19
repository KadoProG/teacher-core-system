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

interface SessionListImportExcelDialogProps {
  isOpen: boolean;
  onClose: () => void;
}

export const SessionListImportExcelDialog: React.FC<
  SessionListImportExcelDialogProps
> = (props) => {
  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop: async (acceptedFiles) => {
      const blobURL = window.URL.createObjectURL(acceptedFiles[0]);
      const xhr = new XMLHttpRequest();
      xhr.responseType = 'arraybuffer';
      xhr.open('GET', blobURL);
      xhr.send();
      xhr.onload = async function () {
        const result = xhr.response; // ArrayBuffer
        const data = new Uint8Array(result);
        const workbook = new exceljs.Workbook();
        await workbook.xlsx.load(data);
        const worksheet = workbook.getWorksheet('セッションマスタ');

        const sections: { id: number; title: string }[] = [];

        for (let i = 2; i < 1000; i++) {
          const row = worksheet?.getRow(i);
          const id = row?.getCell(1).value as number;
          const titleValue = row?.getCell(2).value;

          if (!!id && !!titleValue)
            if (typeof titleValue === 'string') {
              const title = titleValue;
              sections.push({ id, title });
            } else {
              const titleValue2 =
                titleValue as unknown as exceljs.CellRichTextValue;
              const title = titleValue2.richText.map((v) => v.text).join('');
              sections.push({ id, title });
            }
        }
        // TODO
        // console.log(sections);
      };
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
