import CreateOutlinedIcon from '@mui/icons-material/CreateOutlined';
import {
  Box,
  Divider,
  Drawer,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Typography,
} from '@mui/material';
import React from 'react';

const drawerWidth = 250;

interface SideSessionListProps {
  sessions: IEnglishWordPracSession[];
  onChangeSession: (id: number) => void;
}

export const SideSessionList: React.FC<SideSessionListProps> = (props) => (
  <Drawer
    open={true}
    sx={{
      width: drawerWidth,
      flexShrink: 0,
      '& .MuiDrawer-paper': {
        width: drawerWidth,
        boxSizing: 'border-box',
      },
    }}
    variant="persistent"
    anchor="left"
  >
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
    {props.sessions.length === 0 && (
      <Typography>セッションはありません。</Typography>
    )}
    <nav aria-label="secondary mailbox folders">
      <List>
        {props.sessions.map((session) => (
          <ListItem disablePadding key={session.id}>
            <ListItemButton onClick={() => props.onChangeSession(session.id)}>
              <ListItemText primary={`${session.id}　${session.title}`} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </nav>
  </Drawer>
);
