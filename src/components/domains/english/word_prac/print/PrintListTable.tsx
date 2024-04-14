import { Box, Divider, Typography } from '@mui/material';
import { PrintListTableRow } from '@/components/domains/english/word_prac/print/PrintListTableRow';
import { useEnglishWordPracPrintList } from '@/hooks/english/useEnglishWordPracPrintList';

interface PrintListTableProps {
  printHook: ReturnType<typeof useEnglishWordPracPrintList>;
}

export const PrintListTable: React.FC<PrintListTableProps> = (props) => {
  if (!props.printHook) {
    return <Typography>印刷アーカイブはありません</Typography>;
  }
  return (
    <Box>
      <Box>
        <Box display="flex" py={1}>
          <Typography
            ml={1}
            width={{ xs: 50, sm: 100 }}
            align="center"
            variant="body2"
            fontWeight="bold"
          >
            発行日
          </Typography>
          <Typography fontWeight="bold" flex={1} variant="body2" ml={1}>
            タイトル
          </Typography>
          <Typography
            fontWeight="bold"
            width={80}
            variant="body2"
            align="center"
          >
            アクション
          </Typography>
        </Box>
        <Divider />
      </Box>
      {props.printHook.prints.map((print, index) => (
        <PrintListTableRow
          print={print}
          handlePrint={props.printHook.handlePrint}
          handleDelete={props.printHook.handleDelete}
          key={(print.id ?? 'aaa') + '___' + index}
        />
      ))}
    </Box>
  );
};
