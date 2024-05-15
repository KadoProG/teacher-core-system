import { Box, Button, Typography } from '@mui/material';
import React from 'react';
import { ImportExcelDialog } from '@/components/commons/ImportExcelDialog';
import { SessionListTable } from '@/components/domains/english/word_prac/session/SessionListTable';
import { useEnglishWordPracSession } from '@/hooks/english/useEnglishWordPracSession';

export const SessionList: React.FC = () => {
  const {
    handleExportExcelData,
    handleSessionsDelete,
    dropDialog,
    dropzone,
    sessions,
    isLoading,
  } = useEnglishWordPracSession();

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
            onClick={handleSessionsDelete}
          >
            削除する
          </Button>
          <Button
            variant="outlined"
            color="inherit"
            size="small"
            onClick={dropDialog.handleOpenDialog}
          >
            インポートする
          </Button>
          <Button
            variant="outlined"
            color="inherit"
            size="small"
            onClick={handleExportExcelData}
          >
            エクスポートする
          </Button>
          <ImportExcelDialog
            isOpen={dropDialog.isOpen}
            onClose={dropDialog.handleCloseDialog}
            dropzone={dropzone}
          />
        </Box>
      </Box>
      <SessionListTable sessions={sessions} isLoading={isLoading} />
    </>
  );
};
