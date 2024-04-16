import CreateOutlinedIcon from '@mui/icons-material/CreateOutlined';
import {
  Box,
  Divider,
  Drawer,
  IconButton,
  List,
  ListItemButton,
  ListItemText,
  Skeleton,
  Typography,
} from '@mui/material';
import React from 'react';
import { EnglishLayoutToolbar } from '@/components/commons/layout/EnglishLayoutToolbar';
import { useEnglishWordPracWordList } from '@/hooks/english/useEnglishWordPracWordList';

const drawerWidth = 250;

interface SideSessionListProps {
  englishWordPrac: ReturnType<typeof useEnglishWordPracWordList>;
  isOpen: boolean;
  isMin600?: boolean;
  onClose: () => void;
}

export const SideSessionList: React.FC<SideSessionListProps> = (props) => (
  <Drawer
    open={props.isOpen}
    onClose={props.onClose}
    sx={{
      width: props.isOpen ? drawerWidth : 0,
      flexShrink: 0,
      '& .MuiDrawer-paper': {
        width: drawerWidth,
        boxSizing: 'border-box',
      },
    }}
    variant={props.isMin600 ? 'persistent' : 'temporary'}
    anchor="left"
  >
    <EnglishLayoutToolbar />
    <Box
      display="flex"
      justifyContent="space-between"
      width="100%"
      alignItems="center"
    >
      <Typography variant="h6" fontWeight="bold">
        セッション
      </Typography>
      <IconButton href="/english/word_prac/session">
        <CreateOutlinedIcon />
      </IconButton>
    </Box>
    <Divider />
    {props.englishWordPrac.isLoadingSessions && (
      <Box px={2}>
        {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15].map((v) => (
          <Skeleton key={v} height={60} />
        ))}
      </Box>
    )}
    {!props.englishWordPrac.isLoadingSessions &&
      props.englishWordPrac.sessions.length === 0 && (
        <Typography>セッションはありません。</Typography>
      )}
    <nav aria-label="secondary mailbox folders">
      <List>
        {props.englishWordPrac.sessions.map((session) => (
          <ListItemButton
            key={session.id}
            onClick={() => {
              props.englishWordPrac.onSelectedSession(session.id);
              props.onClose();
            }}
            selected={props.englishWordPrac.selectedSessionId === session.id}
            sx={{
              '&.Mui-selected': {
                bgcolor: (theme) => `${theme.palette.background.default}`,
              },
            }}
          >
            <ListItemText primary={`${session.row}　${session.title}`} />
          </ListItemButton>
        ))}
      </List>
    </nav>
  </Drawer>
);
