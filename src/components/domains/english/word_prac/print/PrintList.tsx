import { Box, Paper, Typography } from '@mui/material';
import React from 'react';
import { useEnglishWordPracPrintList } from '@/hooks/english/useEnglishWordPracPrintList';

export const PrintList: React.FC = () => {
  // const englishWordPracSession = useEnglishWordPracSession();

  const printHook = useEnglishWordPracPrintList();
  const a = 0;
  return (
    <>
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <Typography variant="h5" component="h2" fontWeight="bold">
          印刷アーカイブ
        </Typography>
        <Box>
          {/* <Button
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
          /> */}
        </Box>
      </Box>
      <Paper component={Box} p={2}>
        {printHook.prints.length === 0 ? (
          <Typography>印刷アーカイブはありません</Typography>
        ) : (
          <Box>aa</Box>
          // <Table>
          //   <TableHead>

          //     {/* <SessionListTableHeadRow /> */}
          //   </TableHead>
          //   <TableBody>
          //     {printHook.prints.map((prints) => (
          //       <Box key={prints.title}>{prints.title}</Box>
          //     ))}
          //   </TableBody>
          // </Table>
        )}
      </Paper>
    </>
  );
};
