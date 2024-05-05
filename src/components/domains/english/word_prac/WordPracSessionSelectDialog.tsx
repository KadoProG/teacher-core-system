import CreateOutlinedIcon from '@mui/icons-material/CreateOutlined';
import {
  Box,
  Dialog,
  DialogContent,
  DialogTitle,
  IconButton,
  List,
  ListItemButton,
  useMediaQuery,
} from '@mui/material';
import Link from 'next/link';
import React from 'react';
import { useForm } from 'react-hook-form';
import { FormSearchField } from '@/components/commons/input/FormSearchField';
import { useEnglishWordPracWordList } from '@/hooks/english/useEnglishWordPracWordList';

interface WordPracSessionSelectDialogProps {
  isOpen: boolean;
  onClose: () => void;
  sessions: IEnglishWordPracSession[];
  selectedSession?: IEnglishWordPracSession & { index: number };
  onSelectSession: ReturnType<
    typeof useEnglishWordPracWordList
  >['onSelectSession'];
}

/**
 * 単語練習セッション選択用のダイアログ
 */
export const WordPracSessionSelectDialog: React.FC<
  WordPracSessionSelectDialogProps
> = (props) => {
  const { control } = useForm();

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
    <Dialog
      open={props.isOpen}
      onClose={props.onClose}
      component={Box}
      fullWidth
      maxWidth="md"
    >
      <DialogTitle>
        <Box display="flex" justifyContent="space-between">
          <FormSearchField
            name="search"
            label="セッションを検索する"
            control={control}
            placeholder="セッション名または番号"
            fullWidth
            sx={{ minWidth: { xs: false, sm: 300 } }}
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
                    props.onClose();
                  }}
                  selected={props.selectedSession?.id === session.id}
                  sx={{
                    '&.Mui-selected': {
                      bgcolor: (theme) => `${theme.palette.background.default}`,
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
  );
};
