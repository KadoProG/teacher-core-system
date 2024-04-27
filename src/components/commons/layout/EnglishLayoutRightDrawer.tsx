import DarkModeOutlinedIcon from '@mui/icons-material/DarkModeOutlined';
import LightModeOutlinedIcon from '@mui/icons-material/LightModeOutlined';
import SmartphoneOutlinedIcon from '@mui/icons-material/SmartphoneOutlined';
import { Box, Button, ButtonGroup, Drawer, Typography } from '@mui/material';
import React from 'react';
import { useConfirmDialog } from '@/components/commons/feedback/ConfirmDialogContext';
import { login, logout } from '@/libs/firebase/firebaseAuth';
import { useAuth } from '@/libs/firebase/FirebaseAuthContext';
import { useColorModeContext } from '@/libs/theme/themeRegistry';

const drawerWidth = 300;

interface EnglishLayoutRightDrawerProps {
  isOpen: boolean;
  onClose: () => void;
}

export const EnglishLayoutRightDrawer: React.FC<
  EnglishLayoutRightDrawerProps
> = (props) => {
  const { selectedMode, toggleColorMode } = useColorModeContext();
  const { confirmDialog } = useConfirmDialog();
  const user = useAuth();

  const handleSignClick = React.useCallback(async () => {
    if (!user) {
      return login();
    }
    const { isAccepted } = await confirmDialog({
      title: 'ログアウトの確認',
      children: 'ログアウトします。よろしいですか？',
      negativeButtonText: 'いいえ',
      positiveButtonText: 'はい',
    });

    if (!isAccepted) {
      return;
    }

    logout();
  }, [confirmDialog, user]);

  return (
    <Drawer
      open={props.isOpen}
      onClose={props.onClose}
      anchor="right"
      sx={{
        width: props.isOpen ? drawerWidth : 0,
        flexShrink: 0,
        zIndex: (theme) => theme.zIndex.drawer + 2,
        '& .MuiDrawer-paper': {
          width: drawerWidth,
          boxSizing: 'border-box',
        },
      }}
      variant="temporary"
    >
      <Box width="100%" p={2}>
        <Typography variant="h6" fontWeight="bold">
          Account
        </Typography>
        <Box mb={2}>
          <Button
            color="inherit"
            variant="outlined"
            size="small"
            onClick={handleSignClick}
          >
            {user ? 'ログアウト' : 'ログイン'}
          </Button>
        </Box>
        <Typography variant="h6" fontWeight="bold">
          ColorMode
        </Typography>
        <Box mb={2}>
          <ButtonGroup
            color="inherit"
            aria-label="ColorMode button group"
            fullWidth
          >
            <Button
              variant={selectedMode === 'light' ? 'contained' : 'outlined'}
              onClick={() => toggleColorMode('light')}
              sx={{ display: 'block' }}
            >
              <LightModeOutlinedIcon fontSize="small" />
              <Typography variant="body2">Light</Typography>
            </Button>
            <Button
              variant={selectedMode === 'device' ? 'contained' : 'outlined'}
              onClick={() => toggleColorMode('device')}
              sx={{ display: 'block' }}
            >
              <SmartphoneOutlinedIcon fontSize="small" />
              <Typography variant="body2">Device</Typography>
            </Button>
            <Button
              variant={selectedMode === 'dark' ? 'contained' : 'outlined'}
              onClick={() => toggleColorMode('dark')}
              sx={{ display: 'block' }}
            >
              <DarkModeOutlinedIcon fontSize="small" />
              <Typography variant="body2">Dark</Typography>
            </Button>
          </ButtonGroup>
        </Box>
      </Box>
    </Drawer>
  );
};
