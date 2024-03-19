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

const drawerWidth = 240;
export const SideSectionList = () => {
  const sectionList = [
    { id: 1, title: '基本動詞①' },
    { id: 2, title: 'スポーツ・趣味・食べ物' },
    { id: 3, title: '基本動詞②' },
    { id: 4, title: '家族・学校' },
    { id: 5, title: '基本動詞③' },
    { id: 6, title: '身の回りのもの' },
    { id: 7, title: '基本形容詞①' },
    { id: 8, title: '代名詞・疑問詞' },
    { id: 9, title: '数' },
    { id: 10, title: '時・曜日・月など' },
    { id: 11, title: '基本形容詞②・副詞' },
    { id: 12, title: 'いろいろな基本名詞①' },
    { id: 13, title: '基本形容詞③' },
    { id: 14, title: '体・自然' },
    { id: 15, title: '交通・町の中' },
    { id: 16, title: '天気・色・国名' },
    { id: 17, title: '前置詞のまとめ' },
    { id: 18, title: '副詞・接続詞' },
    { id: 19, title: 'いろいろな基本名詞②' },
    { id: 20, title: '基本動詞④' },
    { id: 21, title: '基本形容詞④' },
    { id: 22, title: '基本動詞⑤' },
    { id: 23, title: 'いろいろな基本名詞③' },
    { id: 24, title: '中２レベルの基本動詞①' },
    { id: 25, title: '形・位置関係' },
    { id: 26, title: '中２レベルの基本動詞②' },
    { id: 27, title: 'いろいろな形容詞' },
    { id: 28, title: '接続詞・代名詞など' },
    { id: 29, title: '助動詞のまとめ' },
  ];
  return (
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
      {sectionList.length === 0 && (
        <Typography>セッションはありません。</Typography>
      )}
      <nav aria-label="secondary mailbox folders">
        <List>
          {sectionList.map((section) => (
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
};
