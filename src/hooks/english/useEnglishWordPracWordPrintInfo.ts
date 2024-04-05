import axios from 'axios';
import { useForm } from 'react-hook-form';
import { useSnackbar } from '@/components/commons/feedback/SnackbarContext';
import { useEnglishWordPracWordList } from '@/hooks/english/useEnglishWordPracWordList';

/**
 * 単語ページでの印刷設定や、保存処理
 */
export const useEnglishWordPracWordPrintInfo = (
  englishWordPrac: ReturnType<typeof useEnglishWordPracWordList>
) => {
  const { addMessageObject } = useSnackbar();
  const form = useForm<{
    is_randam_jp_en: boolean; // 英語・日本語の出題をランダムにする
    is_randam_word: boolean; // 単語をランダムに出題する
    word_count: number; // 最大出題数
  }>({
    defaultValues: {
      is_randam_jp_en: false,
      is_randam_word: false,
      word_count: 15,
    },
  });

  // セッション情報→タイトルの設定
  const session = englishWordPrac.sessions.find(
    (session) => englishWordPrac.selectedSessionId === session.id
  );
  const sessionTitle = `アイプロⅢ　level${session?.row}「${session?.title}」`;

  // 単語データの設定（form条件に準ずる）
  const wordPracListBefore: IEnglishWordPracPrint['words'] =
    englishWordPrac.words.map((word) => {
      let type: IEnglishWordPracPrint['words'][number]['type'] = 'en';
      // 英語・日本語の出題をランダムにする を付与
      if (form.watch('is_randam_jp_en'))
        type = Math.round(Math.random()) ? 'en' : 'jp';

      return { ...word, type };
    });
  if (form.watch('is_randam_word')) {
    // シャッフルするロジック（Fisher-Yatesアルゴリズム）
    for (let i = wordPracListBefore.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [wordPracListBefore[i], wordPracListBefore[j]] = [
        wordPracListBefore[j],
        wordPracListBefore[i],
      ];
    }
  }
  const wordPracList = wordPracListBefore.slice(0, form.watch('word_count'));

  // 現在生成中の印刷データ
  const print: IEnglishWordPracPrint = {
    id: 1,
    title: sessionTitle,
    words: wordPracList,
    isShowAnswer: true,
  };

  // 印刷データを保存する処理
  const handleSave = async () => {
    axios
      .post('/api/english/word_prac/prints', {
        print,
      })
      .then(() =>
        addMessageObject('印刷アーカイブの保存が完了しました。', 'success')
      )
      .catch((e) => addMessageObject(`保存に失敗しました。${e}`, 'error'));
  };

  return {
    /**
     * 印刷条件のフォーム
     */
    form,
    /**
     * 現在生成中の印刷データ
     */
    print,
    /**
     * 印刷データを保存する処理
     */
    handleSave,
  };
};
