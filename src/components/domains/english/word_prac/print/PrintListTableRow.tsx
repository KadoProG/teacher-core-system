import DeleteIcon from '@mui/icons-material/Delete';
import PrintIcon from '@mui/icons-material/Print';
import {
  Box,
  Divider,
  IconButton,
  ListItemButton,
  Typography,
  useMediaQuery,
} from '@mui/material';
import React from 'react';
import { formatDate } from '@/utils/formatDate';

interface PrintListTableRowProps {
  print: IEnglishWordPracPrint;
  handlePrint: (id: string) => void;
  handleDelete: (id: string) => void;
}

export const PrintListTableRow: React.FC<PrintListTableRowProps> = (props) => {
  const [isSelected, setIsSelected] = React.useState<boolean>(false);

  const isMin600 = useMediaQuery('(min-width:600px)');

  return (
    <Box key={props.print.title + props.print.id}>
      <Box key={props.print.title} display="flex" alignItems="center">
        <Box
          component={ListItemButton}
          display="flex"
          alignItems="center"
          flex={1}
          onClick={() => {
            setIsSelected((prev) => !prev);
          }}
          sx={{
            cursor: 'pointer',
          }}
        >
          <Box width={{ xs: 50, sm: 100 }}>
            {isMin600 ? (
              <Typography>{formatDate(props.print.created_at)}</Typography>
            ) : (
              <>
                <Typography component="p">
                  {formatDate(props.print.created_at).slice(0, 4)}
                </Typography>
                <Typography component="p">
                  {formatDate(props.print.created_at).slice(5, 10)}
                </Typography>
              </>
            )}
          </Box>
          <Typography flex={1}>{props.print.title}</Typography>
        </Box>
        <Box>
          <IconButton
            aria-label="対象のデータを印刷"
            onClick={() => props.print.id && props.handlePrint(props.print.id)}
          >
            <PrintIcon />
          </IconButton>
          <IconButton
            aria-label="対象のデータを削除"
            onClick={() => props.print.id && props.handleDelete(props.print.id)}
          >
            <DeleteIcon />
          </IconButton>
        </Box>
      </Box>
      {isSelected && (
        <Box
          borderTop={(theme) => `1px dashed ${theme.palette.divider}`}
          px={2}
        >
          {props.print.words.map((word, index) => (
            <Box key={word.en_title + word.jp_title + index} display="flex">
              <Typography width={32} variant="body2">
                {index + 1}
              </Typography>
              <Typography
                flex={1}
                variant="body2"
                color={(theme) =>
                  word.type === 'en' ? 'red' : theme.palette.text.primary
                }
              >
                {word.en_title}
              </Typography>
              <Typography
                flex={2}
                variant="body2"
                color={(theme) =>
                  word.type === 'jp' ? 'red' : theme.palette.text.primary
                }
              >
                {word.jp_title}
              </Typography>
            </Box>
          ))}
        </Box>
      )}
      <Divider />
    </Box>
  );
};
