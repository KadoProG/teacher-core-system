import {
  Avatar,
  Box,
  List,
  ListItemAvatar,
  ListItemButton,
  ListItemText,
} from '@mui/material';
import Image from 'next/image';
import { useAuth } from '@/libs/firebase/FirebaseAuthContext';

interface EnglishLayoutDrawerBottomProps {
  drawerWidth: number;
}

export const EnglishLayoutDrawerBottom: React.FC<
  EnglishLayoutDrawerBottomProps
> = (props) => {
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
        <ListItemButton>
          <ListItemAvatar>
            <Avatar>
              {user?.photoURL && (
                <Image src={user.photoURL} width={36} height={36} alt="塾" />
              )}
            </Avatar>
          </ListItemAvatar>
          <ListItemText>{user?.name}</ListItemText>
        </ListItemButton>
      </List>
    </Box>
  );
};
