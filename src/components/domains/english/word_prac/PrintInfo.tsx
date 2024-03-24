import { Box, Button, Paper, Stack, Typography } from '@mui/material';
import React from 'react';
import { useForm } from 'react-hook-form';
import { useReactToPrint } from 'react-to-print';
import { FormCheckBox } from '@/components/commons/input/FormCheckBox';
import { FormTextField } from '@/components/commons/input/FormTextField';
import { PrintLayoutContainer } from '@/components/commons/PrintLayoutContainer';
import { EnglishWordPracPrint } from '@/components/prints/EnglishWordPracPrint';

const words: { en_title: string; jp_title: string; type: 'en' | 'jp' }[] = [
  { en_title: 'variable', jp_title: '変数', type: 'en' },
  { en_title: 'Internal Server Error', jp_title: '内部エラー', type: 'en' },
  { en_title: 'variable', jp_title: '変数', type: 'en' },
  { en_title: 'variable', jp_title: '変数', type: 'jp' },
  { en_title: 'variable', jp_title: '変数', type: 'jp' },
  { en_title: 'variable', jp_title: '変数', type: 'en' },
  { en_title: 'variable', jp_title: '変数', type: 'jp' },
  { en_title: 'variable', jp_title: '変数', type: 'jp' },
  { en_title: 'variable', jp_title: '変数', type: 'en' },
  { en_title: 'variable', jp_title: '変数', type: 'en' },
  { en_title: 'variable', jp_title: '変数', type: 'jp' },
  { en_title: 'variable', jp_title: '変数', type: 'jp' },
  { en_title: 'variable', jp_title: '変数', type: 'en' },
  { en_title: 'variable', jp_title: '変数', type: 'jp' },
  { en_title: 'variable', jp_title: '変数', type: 'jp' },
  { en_title: 'variable', jp_title: '変数', type: 'en' },
  { en_title: 'variable', jp_title: '変数', type: 'en' },
  { en_title: 'variable', jp_title: '変数', type: 'jp' },
  { en_title: 'Australia/Australian', jp_title: '変数', type: 'jp' },
  {
    en_title: 'Australia / Australian',
    jp_title: '～によって・～のそばに・～までに・～によって',
    type: 'en',
  },
];

/**
 * 印刷時のスタイル設定（印刷仕様に応じてスタイリングを調整します）
 * 　NOTE
 * 　・背景色/背景画像を表示させる設定（Chrome）：-webkit-print-color-adjust: exact
 * 　・pageのmargin指定でプレビュー時にデフォルト表示されるURLと時刻（ヘッダーとフッター）を表示エリアから外している
 *  https://zenn.dev/ikefukurou777/articles/606bf9f02cee7d より
 */
const pageStyle = `
    @page { 
      size: auto;
      margin: 5mm;
    }
    
    @media print {
      body { -webkit-print-color-adjust: exact; }
      table { break-after: auto; }
      tr    { break-inside:avoid; break-after:auto }
      td    { break-inside:avoid; break-after:auto }
    }
  `;

export const PrintInfo: React.FC = () => {
  const form = useForm();

  const componentRef = React.useRef<HTMLDivElement>(null);
  /**
   * 印刷対象のコンポーネントを設定します
   */
  const reactToPrintContent = React.useCallback(() => {
    if (!componentRef.current) return null;
    return componentRef.current;
  }, []);

  const handlePrint = useReactToPrint({
    pageStyle, // 印刷のスタイリングを指定
    content: reactToPrintContent, // 印刷エリアを指定
    removeAfterPrint: true, // 印刷後に印刷用のiframeを削除する
  });

  // const handleClick = () => {};
  return (
    <Paper component={Box} p={2}>
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <Typography fontWeight="bold" variant="h5">
          印刷する
        </Typography>
        <Button variant="outlined" color="inherit" onClick={handlePrint}>
          印刷する
        </Button>
      </Box>
      <PrintLayoutContainer componentRef={componentRef}>
        <EnglishWordPracPrint
          title="アイプロ３　Level21「中２レベルの基本動詞①」"
          words={words}
          isShowAnswer={true}
        />
      </PrintLayoutContainer>
      <Box p={2} component={Stack} spacing={2}>
        <FormTextField
          label="単語の個数"
          type="number"
          name="word_count"
          isRequired
          control={form.control}
        />
        <FormCheckBox
          label="単語をランダムに出題する"
          activeLabel="はい"
          negativeLabel="いいえ"
          control={form.control}
          name="is_randam_word"
        />
        <FormCheckBox
          label="答えを印刷する"
          activeLabel="はい"
          negativeLabel="いいえ"
          control={form.control}
          name="is_randam_jp_en"
        />
      </Box>
    </Paper>
  );
};
