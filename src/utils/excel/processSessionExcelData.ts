import exceljs from 'exceljs';
import { convertCellToString } from '@/utils/excel/excelUtils';

/**
 * Excelの単語リストをWordデータに変換する処理
 * @param worksheet exceljsを用いてワークシートに変換されたデータ
 * @returns sessions 最終的に得たsessionsデータ
 */
export const processSessionExcelData = async (
  sessionWorksheet: exceljs.Worksheet,
  wordWorksheet: exceljs.Worksheet
) => {
  const validatedErrors: string[] = [];
  const sessions: IEnglishWordPracSession[] = [];

  // sessionのデータを取得
  for (let i = 2; i < 101; i++) {
    const row: exceljs.Row = sessionWorksheet.getRow(i); // セッションの行
    const idValue = row.getCell(1).value as string; // Rowの値
    const titleValue = row.getCell(2).value; // セッションのタイトル

    if (idValue && titleValue) {
      const title = convertCellToString(titleValue);
      sessions.push({
        row: parseInt(idValue),
        title,
        memo: '',
        created_at: new Date(),
        updated_at: new Date(),
        words: [],
      });
    }
  }

  for (let i = 2; i < 1000; i++) {
    const row: exceljs.Row = wordWorksheet.getRow(i);
    const id = row.getCell(1).value as number;
    const sessionStringValue = row.getCell(2).value; // セッション
    const enTitleValue = row.getCell(3).value; // 英語
    const jpTitleValue = row.getCell(4).value; // 日本語
    const studyYear = row.getCell(5).value; // 履修学年

    try {
      if (id && sessionStringValue && enTitleValue && jpTitleValue) {
        const sessionString = convertCellToString(sessionStringValue);
        const targetSession = sessions.find(
          (session) =>
            `${String(session.row).padStart(2, '0')}　${session.title}` ===
            sessionString
        );

        if (!targetSession) throw new Error('存在しないSessionです');

        targetSession.words.push({
          row: id,
          session_id: '',
          en_title: convertCellToString(enTitleValue),
          jp_title: convertCellToString(jpTitleValue),
          study_year: convertCellToString(studyYear),
          memo: '',
          created_at: new Date(),
          updated_at: new Date(),
        });
      }
    } catch (e) {
      validatedErrors.push(`${i}行目付近にエラーがありました：${e}`);
    }
  }

  if (validatedErrors.length !== 0) {
    throw new Error(validatedErrors.join(', '));
  }

  return sessions;
};
