import axios from 'axios';
import exceljs from 'exceljs';
import { useDropzone } from 'react-dropzone';
import { dropExcelData } from '@/utils/dropExcelData';

export const useSessionExcelUpload = () => {
  const uploadSessions = async (sessions: { row: number; title: string }[]) => {
    try {
      await axios.put('/api/english/word_prac/sessions', { sessions });
    } catch (error) {
      // eslint-disable-next-line
      console.error('セッションデータのアップロードに失敗しました:', error);
    }
  };
  // セッションExcelファイルを処理する関数
  const processSessionExcelData = async (worksheet: exceljs.Worksheet) => {
    const sessions: { row: number; title: string }[] = [];

    for (let i = 2; i < 1000; i++) {
      const row: exceljs.Row = worksheet.getRow(i);
      const id = row.getCell(1).value as number;
      const titleValue = row.getCell(2).value;

      if (id && titleValue) {
        const title =
          typeof titleValue === 'string'
            ? titleValue
            : (titleValue as exceljs.CellRichTextValue).richText
                .map((v) => v.text)
                .join('');
        sessions.push({ row: id, title });
      }
    }

    await uploadSessions(sessions);
  };

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop: (acceptedFiles) => {
      dropExcelData(acceptedFiles, 'セッションマスタ', processSessionExcelData);
    },
  });

  return { getRootProps, getInputProps, isDragActive };
};
