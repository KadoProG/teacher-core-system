import {
  Avatar,
  Box,
  List,
  ListItem,
  ListItemAvatar,
  ListItemButton,
  ListItemText,
} from '@mui/material';
import Image from 'next/image';
import React from 'react';
import { EnglishLayoutAvatorMenu } from '@/components/commons/layout/EnglishLayoutAvatorMenu';
import { useAuth } from '@/libs/firebase/FirebaseAuthContext';

interface EnglishLayoutDrawerBottomProps {
  drawerWidth: number;
  onSettingDialogOpen: () => void;
}

export const EnglishLayoutDrawerBottom: React.FC<
  EnglishLayoutDrawerBottomProps
> = (props) => {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const user = useAuth();
  return (
    <Box
      position="fixed"
      top="auto"
      bottom={0}
      left={0}
      width={props.drawerWidth}
      bgcolor="background.paper"
    >
      <List
        sx={{
          py: 0.5,
          borderTop: (theme) => `1px solid ${theme.palette.divider}`,
          borderRight: (theme) => `1px solid ${theme.palette.divider}`,
        }}
      >
        <EnglishLayoutAvatorMenu
          anchorEl={anchorEl}
          onClose={handleClose}
          isPC
          onSettingDialogOpen={props.onSettingDialogOpen}
        />
        <ListItem sx={{ p: 0 }}>
          <ListItemButton onClick={handleClick}>
            <ListItemAvatar>
              <Avatar>
                {user?.photoURL && (
                  <Image src={user.photoURL} width={36} height={36} alt="塾" />
                )}
              </Avatar>
            </ListItemAvatar>
            <ListItemText>
              {!user ? 'ログインしてください' : user.name}
            </ListItemText>
          </ListItemButton>
        </ListItem>
      </List>
    </Box>
  );
};
