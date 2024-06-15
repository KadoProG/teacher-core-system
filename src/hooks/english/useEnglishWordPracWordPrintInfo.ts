import React from 'react';
import { useForm } from 'react-hook-form';
import { mutate } from 'swr';
import { useSnackbar } from '@/components/commons/feedback/SnackbarContext';
import { usePrinting } from '@/hooks/commons/usePrinting';
import { useEnglishWordPracWordList } from '@/hooks/english/useEnglishWordPracWordList';
import { useAuth } from '@/libs/firebase/FirebaseAuthContext';
import { convertToRomanNumeral } from '@/utils/convertToRomanNumeral';
import { saveEnglishWordPracPrintArchives } from '@/utils/fetch/fetchPrintArchive';

/** 単語ページでの印刷設定や、保存処理 */
export const useEnglishWordPracWordPrintInfo = (
  englishWordPrac: ReturnType<typeof useEnglishWordPracWordList>
) => {
  const { user, selectedTeamId } = useAuth();
  const componentRef = React.useRef<HTMLDivElement>(null);
  const [isShowAnswer, setIsShowAnswer] = React.useState<boolean>(false);
  const { handlePrint: handleHookPrint } = usePrinting({ componentRef });
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
  const session = englishWordPrac.selectedSession;
  const sessionTitle = React.useMemo(() => {
    const level = Math.floor(((session?.row ?? 1) - 1) / 10) + 1;
    return `アイプロ${convertToRomanNumeral(level)} level${String(session?.row).padStart(2, '0')}「${session?.title}」`;
  }, [session]);

  const watchWordCount = form.watch('word_count');
  const watchIsRandamWord = form.watch('is_randam_word');
  const watchIsRandamJpEn = form.watch('is_randam_jp_en');

  // 単語データの設定（form条件に準ずる）
  const wordPracList = React.useMemo(() => {
    let words =
      session?.words?.map((word) => {
        let type: IEnglishWordPracPrint['words'][number]['type'] = 'en';
        if (watchIsRandamJpEn) {
          type = Math.round(Math.random()) ? 'en' : 'jp';
        }
        return { ...word, type };
      }) ?? [];

    if (watchIsRandamWord) {
      // シャッフルするロジック（Fisher-Yatesアルゴリズム）
      for (let i = words.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [words[i], words[j]] = [words[j], words[i]];
      }
    }

    return words.slice(0, watchWordCount);
  }, [session?.words, watchWordCount, watchIsRandamWord, watchIsRandamJpEn]);

  // 現在生成中の印刷データ
  const print: IEnglishWordPracPrint = React.useMemo(
    () => ({
      title: sessionTitle,
      words: wordPracList,
      isShowAnswer,
      email: user?.name ?? '',
      created_at: new Date(),
      updated_at: new Date(),
    }),
    [sessionTitle, wordPracList, isShowAnswer, user?.name]
  );

  // 印刷データを保存する処理
  const handleSave = React.useCallback(async () => {
    try {
      await saveEnglishWordPracPrintArchives([print], selectedTeamId);
      addMessageObject('印刷アーカイブの保存が完了しました。', 'success');
      mutate(selectedTeamId);
    } catch (error) {
      addMessageObject(`保存に失敗しました。${error}`, 'error');
    }
  }, [addMessageObject, print, selectedTeamId]);

  const handlePrint = React.useCallback(
    async (currentIsShowAnswer?: boolean) => {
      await handleSave();
      setIsShowAnswer(currentIsShowAnswer ?? false);
      setTimeout(() => {
        handleHookPrint();
      });
    },
    [handleHookPrint, handleSave]
  );

  return {
    /** 印刷条件のフォーム */
    form,
    /** 現在生成中の印刷データ */
    print,
    /** 印刷データを保存する処理 */
    handleSave,
    /** 印刷コンポーネント */
    componentRef,
    /** プリントが押されたときの動作 */
    handlePrint,
  };
};
