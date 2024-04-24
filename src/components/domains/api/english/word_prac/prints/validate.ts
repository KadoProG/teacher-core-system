interface EnglishWordPracPrintInput {
  id?: number;
  title?: IEnglishWordPracPrint['title'];
  words?: IEnglishWordPracPrint['words'];
  email?: string;
}

/**
 * Printのバリデート関数
 * @returns string[] エラーが格納される エラーなしの場合空配列
 */
export const validateEnglishWordPracPrint = (
  print: EnglishWordPracPrintInput,
  type: 'create' | 'update'
): string[] => {
  const messages: string[] = [];
  if (type === 'update') {
    if (!print.id) {
      messages.push('id is required');
    }
  }

  if (!print.title || !print.title.trim()) {
    messages.push('Title is required');
  }

  if (!print.words || print.words?.length === 0) {
    messages.push('Words is required');
    return messages;
  }

  if (!print.email || !print.email.trim()) {
    messages.push('Email is Required');
  }

  print.words.forEach((word, index) => {
    if (!word.jp_title || !word.jp_title.trim()) {
      messages.push(`No.${index + 1}'s jp_title is required`);
    }

    if (!word.en_title || !word.en_title.trim()) {
      messages.push(`No.${index + 1}'s en_title is required`);
    }

    if (!word.type || !word.type.trim()) {
      messages.push(`No.${index + 1}'s type is required`);
    }

    if (!['jp', 'en'].includes(word.type)) {
      messages.push(`No.${index + 1}'s type is invalid string`);
    }
  });
  return messages;
};
