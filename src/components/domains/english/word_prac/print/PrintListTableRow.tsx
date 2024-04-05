import DeleteIcon from '@mui/icons-material/Delete';
import PrintIcon from '@mui/icons-material/Print';
import { Box, Divider, IconButton, Typography } from '@mui/material';
import React from 'react';
import { formatDate } from '@/utils/formatDate';

interface PrintListTableRowProps {
  print: IEnglishWordPracPrint;
  handlePrint: (id: number) => void;
  handleDelete: (id: number) => void;
}

export const PrintListTableRow: React.FC<PrintListTableRowProps> = (props) => {
  const [isSelected, setIsSelected] = React.useState<boolean>(false);

  return (
    <Box key={props.print.title + props.print.id}>
      <Box key={props.print.title} display="flex" alignItems="center">
        <Box
          display="flex"
          alignItems="center"
          flex={1}
          height={40}
          onClick={() => {
            setIsSelected((prev) => !prev);
          }}
          sx={{
            cursor: 'pointer',
          }}
        >
          <Typography width={100} align="center">
            {formatDate(props.print.created_at)}
          </Typography>
          <Typography flex={1}>{props.print.title}</Typography>
        </Box>
        <Box>
          <IconButton onClick={() => props.handlePrint(props.print.id)}>
            <PrintIcon />
          </IconButton>
          <IconButton onClick={() => props.handleDelete(props.print.id)}>
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
              <Typography flex={1} variant="body2">
                {word.en_title}
              </Typography>
              <Typography flex={2} variant="body2">
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
