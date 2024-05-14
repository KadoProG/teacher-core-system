import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import { Box, Button, IconButton, Paper, Typography } from '@mui/material';
import React from 'react';
import { WordPracSessionSelectDialog } from '@/components/domains/english/word_prac/WordPracSessionSelectDialog';
import { useEnglishWordPracWordList } from '@/hooks/english/useEnglishWordPracWordList';

interface WordPracSessionSelectPaperProps {
  sessions: IEnglishWordPracSession[];
  selectedSession?: IEnglishWordPracSession & { index: number };
  onSelectSession: ReturnType<
    typeof useEnglishWordPracWordList
  >['onSelectSession'];
  isLoadingSessions: boolean;
}

export const WordPracSessionSelectPaper: React.FC<
  WordPracSessionSelectPaperProps
> = (props) => {
  const [open, setOpen] = React.useState<boolean>(false);
  const handleClick = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  return (
    <Paper component={Box} px={2}>
      <Box display="flex" alignItems="center" flexWrap="wrap">
        <Box width={100} position="relative">
          <Typography variant="body2" fontWeight="bold">
            セッション
          </Typography>
        </Box>
        <Box flex={1} minWidth={300}>
          <IconButton
            size="small"
            color="inherit"
            aria-label="前のセッションに移動"
            sx={{
              borderRadius: 1,
              border: (theme) => `1px solid ${theme.palette.divider}`,
            }}
            disabled={
              props.isLoadingSessions || props.selectedSession?.index === 0
            }
            onClick={() => {
              props.selectedSession?.index &&
                props.onSelectSession(
                  props.sessions[props.selectedSession?.index - 1].id
                );
            }}
          >
            <ChevronLeftIcon fontSize="small" />
          </IconButton>
          {props.isLoadingSessions ? (
            <Typography
              sx={{ width: 230 }}
              display="inline-block"
              align="center"
            >
              ロード中…
            </Typography>
          ) : (
            <Button
              color="inherit"
              sx={{
                width: 230,
              }}
              onClick={handleClick}
            >
              <Typography fontWeight="bold">
                {String(props.selectedSession?.row).padStart(2, '0')}
                {'　'}
                {props.selectedSession?.title}
              </Typography>
            </Button>
          )}
          <WordPracSessionSelectDialog
            isOpen={open}
            sessions={props.sessions}
            selectedSession={props.selectedSession}
            onSelectSession={props.onSelectSession}
            onClose={handleClose}
          />
          <IconButton
            size="small"
            color="inherit"
            aria-label="次のセッションに移動"
            sx={{
              borderRadius: 1,
              border: (theme) => `1px solid ${theme.palette.divider}`,
            }}
            disabled={
              props.isLoadingSessions ||
              props.selectedSession?.index === props.sessions.length - 1
            }
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
};
