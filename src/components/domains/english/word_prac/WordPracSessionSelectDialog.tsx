import CreateOutlinedIcon from '@mui/icons-material/CreateOutlined';
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  List,
  ListItemButton,
} from '@mui/material';
import Link from 'next/link';
import React from 'react';
import { FormSearchField } from '@/components/commons/input/FormSearchField';
import { useEnglishWordPracWordList } from '@/hooks/english/useEnglishWordPracWordList';
import { useEnglishWordPracWordSessionDialog } from '@/hooks/english/useEnglishWordPracWordSessionDialog';

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
  const { control, slicedSessions } = useEnglishWordPracWordSessionDialog(
    props.sessions
  );

  return (
    <Dialog
      open={props.isOpen}
      onClose={props.onClose}
      component={Box}
      fullWidth
      maxWidth="md"
    >
      <DialogTitle>
        <FormSearchField
          name="search"
          label="セッションを検索する"
          control={control}
          placeholder="セッション名または番号"
          fullWidth
          sx={{ minWidth: { xs: false, sm: 300 } }}
        />
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
      <DialogActions>
        <Button
          component={Link}
          href="/english/word_prac/session"
          startIcon={<CreateOutlinedIcon />}
          color="inherit"
          variant="outlined"
          size="small"
        >
          編集する
        </Button>
      </DialogActions>
    </Dialog>
  );
};
