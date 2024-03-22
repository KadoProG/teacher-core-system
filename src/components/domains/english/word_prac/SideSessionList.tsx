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
        {props.sessions.map((section) => (
          <ListItem disablePadding key={section.id}>
            <ListItemButton>
              <ListItemText primary={`${section.id}　${section.title}`} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </nav>
  </Drawer>
);
