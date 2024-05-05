import LogoutOutlinedIcon from '@mui/icons-material/LogoutOutlined';
import PeopleIcon from '@mui/icons-material/People';
import SettingsOutlinedIcon from '@mui/icons-material/SettingsOutlined';
import {
  Avatar,
  Box,
  Divider,
  List,
  ListItemAvatar,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Menu,
  MenuItem,
} from '@mui/material';
import Image from 'next/image';
import React from 'react';
import { useConfirmDialog } from '@/components/commons/feedback/ConfirmDialogContext';
import { SettingDialog } from '@/components/commons/settings/SettingDialog';
import { login, logout } from '@/libs/firebase/firebaseAuth';
import { useAuth } from '@/libs/firebase/FirebaseAuthContext';

interface EnglishLayoutDrawerBottomProps {
  drawerWidth: number;
}

export const EnglishLayoutDrawerBottom: React.FC<
  EnglishLayoutDrawerBottomProps
> = (props) => {
  const { confirmDialog } = useConfirmDialog();
  const [settingDialogOpen, setSettingDialogOpen] =
    React.useState<boolean>(false);
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

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
        <Menu
          id="demo-positioned-menu"
          aria-labelledby="demo-positioned-button"
          anchorEl={anchorEl}
          open={open}
          onClose={handleClose}
          anchorOrigin={{
            vertical: 'top',
            horizontal: 'center',
          }}
          transformOrigin={{
            vertical: 'bottom',
            horizontal: 'center',
          }}
          MenuListProps={{
            sx: { p: 1, width: props.drawerWidth - 30 },
          }}
        >
          <MenuItem onClick={handleClose}>
            <ListItemIcon sx={{ color: 'text.primary' }}>
              <PeopleIcon />
            </ListItemIcon>
            <ListItemText>チーム</ListItemText>
          </MenuItem>
          <MenuItem
            onClick={() => {
              handleClose();
              setSettingDialogOpen(true);
            }}
          >
            <ListItemIcon sx={{ color: 'text.primary' }}>
              <SettingsOutlinedIcon />
            </ListItemIcon>
            <ListItemText>設定</ListItemText>
          </MenuItem>
          <Divider />
          <MenuItem
            onClick={() => {
              handleClose();
              if (user) {
                confirmDialog({
                  title: 'ログアウトの確認',
                  children: '本当にログアウトしますか？',
                  negativeButtonText: 'キャンセル',
                  positiveButtonText: 'ログアウト',
                }).then((result) => {
                  if (result.isAccepted) {
                    logout();
                  }
                });
              } else {
                login();
              }
            }}
          >
            <ListItemIcon sx={{ color: 'text.primary' }}>
              <LogoutOutlinedIcon />
            </ListItemIcon>
            <ListItemText>{!user ? 'ログイン' : 'ログアウト'}</ListItemText>
          </MenuItem>
        </Menu>
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
      </List>
      <SettingDialog
        onClose={() => setSettingDialogOpen(false)}
        open={settingDialogOpen}
      />
    </Box>
  );
};
