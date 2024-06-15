import exceljs from 'exceljs';
import { exportExcelToFile } from '@/utils/excel/common/exportExcelToFile';

const MAX_ROW = 100 as const;

/**
 * セッションデータをExcelにエクスポートする関数
 * @param sessions セッションデータ
 */
export const exportSessionToExcel = async (
  sessions: IEnglishWordPracSession[]
): Promise<void> => {
  const workbook = new exceljs.Workbook();
  await makeExcelSheetSession__summary(workbook, sessions);
  await makeExcelSheetSession__detail(workbook, sessions);

  await exportExcelToFile(workbook, 'sessions.xlsx');
};

const makeExcelSheetSession__summary = async (
  workbook: exceljs.Workbook,
  sessions: IEnglishWordPracSession[]
) => {
  // Sheetを追加
  const worksheet = workbook.addWorksheet('セッション');
  if (!worksheet) throw new Error('作成失敗');

  worksheet.columns = [
    { header: 'id', key: 'id' },
    { header: 'title', key: 'title' },
    { header: 'オート', key: 'automation' },
  ];

  let maxRow = 2;
  sessions.forEach((session) => {
    if (session.row > maxRow) {
      maxRow = session.row;
    }
    worksheet.addRow({
      id: session.row,
      title: session.title,
      automation: {
        formula: `=REPT("0",2-LEN(A${session.row + 1}))&A${session.row + 1}&"　"&B${session.row + 1}`,
      },
    });
  });

  // 100行まで埋める
  for (let i = maxRow + 1; i < MAX_ROW; i++) {
    worksheet.addRow({
      id: i,
      title: '',
      automation: {
        formula: `=REPT("0",2-LEN(A${i + 1}))&A${i + 1}&"　"&B${i + 1}`,
      },
    });
  }
};

export const makeExcelSheetSession__detail = async (
  workbook: exceljs.Workbook,
  sessions: IEnglishWordPracSession[]
) => {
  // Sheetを追加
  const worksheet = workbook.addWorksheet('セッション詳細');
  if (!worksheet) throw new Error('作成失敗');

  // 列を定義
  worksheet.columns = [
    { header: 'id', key: 'id' },
    { header: 'セッション', key: 'session' },
    { header: '英語', key: 'en_title' },
    { header: '日本語', key: 'jp_title' },
    { header: '履修学年', key: 'study_year' },
  ];

  let i = 1; // 行数

  sessions.forEach((session) => {
    const sessionText = session
      ? `${String(session.row).padStart(2, '0')}　${session.title}`
      : '';
    session.words?.forEach((word) => {
      // Wordの行を追加
      worksheet.addRow({
        id: word?.row,
        session: sessionText,
        en_title: word?.en_title,
        jp_title: word?.jp_title,
        study_year: word?.study_year,
      });

      // セッションのセルにデータバリデーションを設定
      worksheet.getCell(`B${i + 1}`).dataValidation = {
        type: 'list',
        formulae: [`セッション!$C$2:$C$${MAX_ROW + 1}`],
        allowBlank: true, // 空白の入力を許可
      };

      i++;
    });
  });
};
