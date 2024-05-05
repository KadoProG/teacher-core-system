import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import { Box, Button, IconButton, Paper, Typography } from '@mui/material';
import React from 'react';
import { useEnglishWordPracWordList } from '@/hooks/english/useEnglishWordPracWordList';

interface WordPracSessionSelectPaperProps {
  sessions: IEnglishWordPracSession[];
  selectedSession?: IEnglishWordPracSession & { index: number };
  onSelectSession: ReturnType<
    typeof useEnglishWordPracWordList
  >['onSelectSession'];
}

export const WordPracSessionSelectPaper: React.FC<
  WordPracSessionSelectPaperProps
> = (props) => (
  <Paper component={Box} px={2}>
    <Box display="flex" alignItems="center">
      <Box width={100} position="relative">
        <Typography variant="body2">セッション</Typography>
      </Box>
      <Box flex={1} minWidth={300}>
        <IconButton
          size="small"
          color="inherit"
          sx={{
            borderRadius: 1,
            border: (theme) => `1px solid ${theme.palette.divider}`,
          }}
          disabled={props.selectedSession?.index === 0}
          onClick={() => {
            props.selectedSession?.index &&
              props.onSelectSession(
                props.sessions[props.selectedSession?.index - 1].id
              );
          }}
        >
          <ChevronLeftIcon fontSize="small" />
        </IconButton>
        <Button
          color="inherit"
          sx={{
            width: 230,
          }}
        >
          <Typography fontWeight="bold">
            {String(props.selectedSession?.row).padStart(2, '0')}{' '}
            {props.selectedSession?.title}
          </Typography>
        </Button>
        <IconButton
          size="small"
          color="inherit"
          sx={{
            borderRadius: 1,
            border: (theme) => `1px solid ${theme.palette.divider}`,
          }}
          disabled={props.selectedSession?.index === props.sessions.length - 1}
          onClick={() => {
            props.selectedSession &&
              props.onSelectSession(
                props.sessions[props.selectedSession?.index + 1].id
              );
          }}
        >
          <ChevronRightIcon fontSize="small" />
        </IconButton>
      </Box>
    </Box>
  </Paper>
);
