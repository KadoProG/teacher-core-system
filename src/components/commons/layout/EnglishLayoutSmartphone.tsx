import FormatListBulletedIcon from '@mui/icons-material/FormatListBulleted';
import PrintIcon from '@mui/icons-material/Print';
import {
  AppBar,
  Avatar,
  BottomNavigation,
  BottomNavigationAction,
  Box,
  Button,
  Paper,
  Toolbar,
  useMediaQuery,
} from '@mui/material';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import { EnglishLayoutAvatorMenu } from '@/components/commons/layout/EnglishLayoutAvatorMenu';
import { useAuth } from '@/libs/firebase/FirebaseAuthContext';

interface EnglishLayoutSmartphoneProps {
  children: React.ReactNode;
  onSettingDialogOpen: () => void;
}

/** スマホ時の表示 */
export const EnglishLayoutSmartphone: React.FC<EnglishLayoutSmartphoneProps> = (
  props
) => {
  const isMin600 = useMediaQuery('(min-width:600px)');
  const user = useAuth();
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };
  return (
    <React.Fragment>
      {!isMin600 && (
        <React.Fragment>
          <AppBar
            position="fixed"
            elevation={0}
            sx={{
              bgcolor: 'background.paper',
              borderBottom: (theme) => `1px solid ${theme.palette.divider}`,
              zIndex: (theme) => theme.zIndex.drawer + 1,
            }}
          >
            <Toolbar variant="dense">
              <Image src="/icon-512x512.png" width={36} height={36} alt="塾" />
              <Box sx={{ flexGrow: 1 }} />
              <Button
                onClick={handleClick}
                aria-label="アカウントメニューを開く"
              >
                <Avatar>
                  {user?.photoURL && (
                    <Image
                      src={user.photoURL}
                      width={36}
                      height={36}
                      alt="アカウントアイコン"
                    />
                  )}
                </Avatar>
              </Button>
            </Toolbar>
          </AppBar>
          <Toolbar variant="dense" />
          <EnglishLayoutAvatorMenu
            anchorEl={anchorEl}
            onClose={handleClose}
            onSettingDialogOpen={props.onSettingDialogOpen}
          />
        </React.Fragment>
      )}
      {props.children}
      {!isMin600 && (
        <React.Fragment>
          <Toolbar variant="dense" />
          <Paper sx={{ position: 'fixed', bottom: 0, left: 0, right: 0 }}>
            <BottomNavigation showLabels>
              <BottomNavigationAction
                href="/english/word_prac"
                component={Link}
                label="単語リスト"
                icon={<FormatListBulletedIcon />}
              />
              <BottomNavigationAction
                href="/english/word_prac/print"
                component={Link}
                label="印刷アーカイブ"
                icon={<PrintIcon />}
              />
            </BottomNavigation>
          </Paper>
        </React.Fragment>
      )}
    </React.Fragment>
  );
};
