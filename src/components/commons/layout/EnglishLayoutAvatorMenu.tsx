import LogoutOutlinedIcon from '@mui/icons-material/LogoutOutlined';
import PeopleIcon from '@mui/icons-material/People';
import SettingsOutlinedIcon from '@mui/icons-material/SettingsOutlined';
import {
  Divider,
  ListItemIcon,
  ListItemText,
  Menu,
  MenuItem,
  Typography,
} from '@mui/material';
import React from 'react';
import { useConfirmDialog } from '@/components/commons/feedback/ConfirmDialogContext';
import { login, logout } from '@/libs/firebase/firebaseAuth';
import { useAuth } from '@/libs/firebase/FirebaseAuthContext';

interface EnglishLayoutAvatorMenuProps {
  anchorEl: HTMLElement | null;
  onClose: () => void;
  onSettingDialogOpen: () => void;
  isPC?: boolean;
}

export const EnglishLayoutAvatorMenu: React.FC<EnglishLayoutAvatorMenuProps> = (
  props
) => {
  const { confirmDialog } = useConfirmDialog();
  const user = useAuth();
  return (
    <Menu
      id={`demo-positioned-menu${props.isPC ? '' : '-mobile'}`}
      aria-labelledby="demo-positioned-button"
      anchorEl={props.anchorEl}
      open={Boolean(props.anchorEl)}
      onClose={props.onClose}
      anchorOrigin={{
        vertical: props.isPC ? 'top' : 'bottom',
        horizontal: 'center',
      }}
      transformOrigin={{
        vertical: props.isPC ? 'bottom' : 'top',
        horizontal: 'center',
      }}
      MenuListProps={{
        sx: { p: 1, width: 250 - 30 },
      }}
    >
      {!props.isPC && (
        <Typography variant="body2" color="gray">
          {user?.name}
        </Typography>
      )}
      {!props.isPC && <Divider />}
      <MenuItem onClick={props.onClose}>
        <ListItemIcon sx={{ color: 'text.primary' }}>
          <PeopleIcon />
        </ListItemIcon>
        <ListItemText>チーム</ListItemText>
      </MenuItem>
      <MenuItem
        onClick={() => {
          props.onClose();
          props.onSettingDialogOpen();
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
          props.onClose();
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
  );
};
