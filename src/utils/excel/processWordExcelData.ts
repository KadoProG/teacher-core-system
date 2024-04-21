import exceljs from 'exceljs';
import { convertCellToString } from '@/utils/excelUtils';

/**
 * Excelの単語リストをWordデータに変換する処理
 * @param worksheet exceljsを用いてワークシートに変換されたデータ
 * @param sessions Wordのsession_idを決めるためのセッションデータ
 * @returns words 最終的に得たWordデータ
 */
export const processWordExcelData = async (
  worksheet: exceljs.Worksheet,
  sessions: IEnglishWordPracSession[]
) => {
  const words: {
    row: number;
    session_id: string;
    en_title: string;
    jp_title: string;
    study_year: string;
  }[] = [];

  const validatedErrors: string[] = [];

  for (let i = 2; i < 1000; i++) {
    const row: exceljs.Row = worksheet.getRow(i);
    const id = row.getCell(1).value as number;
    const sessionStringValue = row.getCell(2).value; // セッション
    const enTitleValue = row.getCell(3).value; // 英語
    const jpTitleValue = row.getCell(4).value; // 日本語
    const studyYear = row.getCell(5).value; // 履修学年

    try {
      if (id && sessionStringValue && enTitleValue && jpTitleValue) {
        const sessionString = convertCellToString(sessionStringValue);
        const session_id = sessions.find(
          (session) =>
            `${String(session.row).padStart(2, '0')}　${session.title}` ===
            sessionString
        )?.id;
        if (!session_id) throw new Error('存在しないSessionです');
        const en_title = convertCellToString(enTitleValue);
        const jp_title = convertCellToString(jpTitleValue);
        const study_year = convertCellToString(studyYear);
        words.push({
          row: id,
          session_id,
          en_title,
          jp_title,
          study_year,
        });
      }
    } catch (e) {
      validatedErrors.push(`${i}行目付近にエラーがありました：${e}`);
    }
  }

  if (validatedErrors.length !== 0) {
    throw new Error(validatedErrors.join(', '));
  }

  return words;

  // await uploadWords(words);
};
