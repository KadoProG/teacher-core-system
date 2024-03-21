interface EnglishWordPracSessionInput {
  id?: number;
  row?: never;
  title?: string;
  memo?: string;
}
/**
 * Sessionのバリデート関数
 * @returns string[] エラーが格納される エラーなしの場合空配列
 */
export const validateEnglishWordPracSession = (
  session: EnglishWordPracSessionInput,
  type: 'create' | 'update'
): string[] => {
  const messages: string[] = [];
  if (type === 'update') {
    if (!session.id) {
      messages.push('id is required');
    }
  }
  if (!session.row) {
    messages.push('row is required');
  }

  if (!(typeof session.row === 'number') || session.row <= 0) {
    messages.push('Invalid row value');
  }

  if (!session.title || !session.title.trim()) {
    messages.push('Title is required');
  }

  return messages;
};
