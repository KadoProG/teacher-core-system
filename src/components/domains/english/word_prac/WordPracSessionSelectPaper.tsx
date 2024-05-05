import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import CreateOutlinedIcon from '@mui/icons-material/CreateOutlined';
import {
  Box,
  Button,
  Dialog,
  DialogContent,
  DialogTitle,
  IconButton,
  List,
  ListItemButton,
  Paper,
  TextField,
  Typography,
  useMediaQuery,
} from '@mui/material';
import Link from 'next/link';
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
> = (props) => {
  const [open, setOpen] = React.useState<boolean>(false);
  const handleClick = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  const isMin600 = useMediaQuery('(min-width:600px)');
  const isMin800 = useMediaQuery('(min-width:800px)');

  const chunkSize = isMin800 ? 10 : isMin600 ? 15 : 1000;

  const slicedSessions = props.sessions.reduce((acc: any, _, index) => {
    if (index % chunkSize === 0) {
      acc.push(props.sessions.slice(index, index + chunkSize));
    }
    return acc;
  }, []) as IEnglishWordPracSession[][];

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
            onClick={handleClick}
          >
            <Typography fontWeight="bold">
              {String(props.selectedSession?.row).padStart(2, '0')}{' '}
              {props.selectedSession?.title}
            </Typography>
          </Button>
          <Dialog
            open={open}
            onClose={handleClose}
            component={Box}
            fullWidth
            maxWidth="md"
          >
            <DialogTitle>
              <Box display="flex" justifyContent="space-between">
                <TextField
                  label="検索"
                  type="text"
                  name="title"
                  placeholder="セッション名または番号"
                  size="small"
                />
                <IconButton component={Link} href="/english/word_prac/session">
                  <CreateOutlinedIcon />
                </IconButton>
              </Box>
            </DialogTitle>
            <DialogContent>
              <Box display="flex">
                {slicedSessions.map((sessions, index) => (
                  <List
                    dense
                    key={index}
                    sx={{
                      flex: 1,
                      borderRight: (theme) =>
                        index < slicedSessions.length - 1
                          ? `1px solid ${theme.palette.divider}`
                          : undefined,
                    }}
                  >
                    {sessions.map((session) => (
                      <ListItemButton
                        key={session.id}
                        onClick={() => {
                          props.onSelectSession(session.id);
                          handleClose();
                        }}
                        selected={props.selectedSession?.id === session.id}
                        sx={{
                          '&.Mui-selected': {
                            bgcolor: (theme) =>
                              `${theme.palette.background.default}`,
                          },
                          fontWeight: 'bold',
                          minWidth: 250,
                        }}
                      >
                        {String(session.row).padStart(2, '0')}　{session.title}
                      </ListItemButton>
                    ))}
                  </List>
                ))}
              </Box>
            </DialogContent>
          </Dialog>
          <IconButton
            size="small"
            color="inherit"
            sx={{
              borderRadius: 1,
              border: (theme) => `1px solid ${theme.palette.divider}`,
            }}
            disabled={
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
