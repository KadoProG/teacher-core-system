import exceljs from 'exceljs';

/**
 * Excelファイルを構築してダウンロード
 */
export const exportExcelData = async (sessions: IEnglishWordPracSession[]) => {
  // Workbookの作成
  const workbook = new exceljs.Workbook();

  // セッションマスタのシートを作成
  await makeExcelSheetSessionMaster(workbook, sessions);

  await makeExcelSheetWordMaster(workbook, sessions);

  // UInt8Arrayを生成
  const uint8Array = await workbook.xlsx.writeBuffer();
  // Blob
  const blob = new Blob([uint8Array], { type: 'application/octet-binary' });
  const url = window.URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = 'sample.xlsx';
  a.click(); // ダウンロードを実行
  URL.revokeObjectURL(url);
  a.remove();
};

/**
 * Excelのシートにセッションマスタのシートを作成する処理
 */
const makeExcelSheetSessionMaster = async (
  workbook: exceljs.Workbook,
  sessions: IEnglishWordPracSession[]
) => {
  const worksheet = workbook.addWorksheet('セッションマスタ');
  if (!worksheet) throw new Error('作成失敗');
  // 列を定義
  worksheet.columns = [
    { header: 'id', key: 'id' },
    { header: 'title', key: 'title' },
    { header: 'オート', key: 'automation' },
  ];

  // 2行目以降の各行に対して式を適用
  for (let i = 1; i < 100; i++) {
    const session = sessions.find((v) => v.row === i);
    worksheet.addRow({
      id: String(i).padStart(2, '0'),
      title: session?.title,
      automation: {
        formula: `=REPT("0",2-LEN(A${i + 1}))&A${i + 1}&"　"&B${i + 1}`,
      },
    });
  }
};
/**
 * Excelのシートに単語マスタのシートを作成する処理
 */
const makeExcelSheetWordMaster = async (
  workbook: exceljs.Workbook,
  sessions: IEnglishWordPracSession[]
) => {
  const worksheet = workbook.addWorksheet('単語マスタ');
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
        formulae: [`セッションマスタ!$C$2:$C$${sessions.length + 1}`],
        allowBlank: true, // 空白の入力を許可
      };

      i++;
    });
  });
};
