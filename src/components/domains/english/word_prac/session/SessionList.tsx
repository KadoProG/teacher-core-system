import { Box, Button, Typography } from '@mui/material';
import React from 'react';
import { ImportExcelDialog } from '@/components/commons/ImportExcelDialog';
import { SessionListTable } from '@/components/domains/english/word_prac/session/SessionListTable';
import { useEnglishWordPracSession } from '@/hooks/english/useEnglishWordPracSession';

export const SessionList: React.FC = () => {
  const englishWordPracSession = useEnglishWordPracSession();

  return (
    <>
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <Typography variant="h5" component="h2" fontWeight="bold">
          セッション一覧
        </Typography>
        <Box>
          <Button
            variant="contained"
            color="error"
            size="small"
            onClick={englishWordPracSession.handleSessionsDelete}
          >
            削除する
          </Button>
          <Button
            variant="outlined"
            color="inherit"
            size="small"
            onClick={englishWordPracSession.dropDialog.handleOpen}
          >
            インポートする
          </Button>
          <Button
            variant="outlined"
            color="inherit"
            size="small"
            onClick={englishWordPracSession.handleExportExcelData}
          >
            エクスポートする
          </Button>
          <ImportExcelDialog
            isOpen={englishWordPracSession.dropDialog.isOpen}
            onClose={englishWordPracSession.dropDialog.handleClose}
            dropzone={englishWordPracSession.dropzone}
          />
        </Box>
      </Box>
      <SessionListTable
        sessions={englishWordPracSession.sessions}
        isLoading={englishWordPracSession.isLoading}
      />
    </>
  );
};
