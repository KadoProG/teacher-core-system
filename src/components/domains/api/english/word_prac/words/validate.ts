interface EnglishWordPracWordInput {
  id?: number;
  row?: never;
  session_id?: number;
  jp_title?: string;
  en_title?: string;
  study_year?: string;
  memo?: string;
}
/**
 * Wordのバリデート関数
 * @returns string[] エラーが格納される エラーなしの場合空配列
 */
export const validateEnglishWordPracWord = (
  word: EnglishWordPracWordInput,
  type: 'create' | 'update'
): string[] => {
  const messages: string[] = [];
  if (type === 'update') {
    if (!word.id) {
      messages.push('id is required');
    }
  }
  if (!word.row) {
    messages.push('row is required');
  }

  if (!word.session_id) {
    messages.push('session_id is required');
  }

  if (!(typeof word.row === 'number') || word.row <= 0) {
    messages.push('Invalid row value');
  }

  if (!word.jp_title || !word.jp_title.trim()) {
    messages.push('jp_title is required');
  }

  if (!word.en_title || !word.en_title.trim()) {
    messages.push('en_title is required');
  }

  return messages;
};
