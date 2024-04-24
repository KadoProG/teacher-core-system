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
          <Box ml={1} width={{ xs: 50, sm: 240 }} display="flex">
            <Typography
              variant="body2"
              fontWeight="bold"
              align="center"
              width={90}
            >
              発行日
            </Typography>

            <Typography
              variant="body2"
              fontWeight="bold"
              align="center"
              flex={1}
              display={{ xs: 'none', sm: 'block' }}
            >
              作成者
            </Typography>
          </Box>
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
