import FormatListBulletedIcon from '@mui/icons-material/FormatListBulleted';
import PrintIcon from '@mui/icons-material/Print';
import {
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  ListSubheader,
  Toolbar,
  useMediaQuery,
} from '@mui/material';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import { EnglishLayoutDrawerBottom } from '@/components/commons/layout/EnglishLayoutPCDrawerBottom';

const drawerWidth = 250;

export const EnglishLayoutPCDrawer: React.FC = () => {
  const isMin600 = useMediaQuery('(min-width:600px)');
  return (
    <Drawer
      open={isMin600}
      variant="persistent"
      sx={{
        width: isMin600 ? drawerWidth : 0,
        flexShrink: 0,
        '& .MuiDrawer-paper': {
          width: drawerWidth,
          boxSizing: 'border-box',
        },
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      <List
        subheader={
          <ListSubheader sx={{ display: 'flex', alignItems: 'center', py: 1 }}>
            <Image src="/icon-512x512.png" width={50} height={50} alt="塾" />
          </ListSubheader>
        }
      >
        <ListItem sx={{ p: 0 }}>
          <ListItemButton href="/english/word_prac" component={Link}>
            <ListItemIcon sx={{ minWidth: 40 }}>
              <FormatListBulletedIcon />
            </ListItemIcon>
            <ListItemText primary="単語リスト" />
          </ListItemButton>
        </ListItem>
        <ListItem sx={{ p: 0 }}>
          <ListItemButton href="/english/word_prac/print" component={Link}>
            <ListItemIcon sx={{ minWidth: 40 }}>
              <PrintIcon />
            </ListItemIcon>
            <ListItemText primary="印刷アーカイブ" />
          </ListItemButton>
        </ListItem>
      </List>
      <Toolbar />
      <EnglishLayoutDrawerBottom drawerWidth={drawerWidth} />
    </Drawer>
  );
};
