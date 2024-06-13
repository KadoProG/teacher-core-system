import exceljs from 'exceljs';

export const exportPrintArchiveToExcel = async (
  printArchives: IEnglishWordPracPrint[]
) => {
  const workbook = new exceljs.Workbook();
  await makeExcelSheetPrintArchive__summary(workbook, printArchives);
  await makeExcelSheetPrintArchive__detail(workbook, printArchives);

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

const makeExcelSheetPrintArchive__summary = async (
  workbook: exceljs.Workbook,
  printArchives: IEnglishWordPracPrint[]
) => {
  // Sheetを追加
  const worksheet = workbook.addWorksheet('印刷アーカイブ');
  if (!worksheet) throw new Error('作成失敗');

  worksheet.columns = [
    { header: 'id', key: 'id' },
    { header: 'title', key: 'title' },
    { header: '作成者', key: 'author' },
    { header: '作成日', key: 'created_at' },
  ];

  printArchives.forEach((print) => {
    worksheet.addRow({
      id: print.id,
      title: print.title,
      author: print.email,
      created_at: print.created_at,
    });
  });
};

const makeExcelSheetPrintArchive__detail = async (
  workbook: exceljs.Workbook,
  printArchives: IEnglishWordPracPrint[]
) => {
  // Sheetを追加
  const worksheet = workbook.addWorksheet('印刷アーカイブ詳細');
  if (!worksheet) throw new Error('作成失敗');

  // 列を定義
  worksheet.columns = [
    { header: 'id', key: 'id' },
    { header: '英語', key: 'en_title' },
    { header: '日本語', key: 'jp_title' },
    { header: '問題形式', key: 'type' },
  ];

  printArchives.forEach((printArchive) => {
    printArchive.words.forEach((word) => {
      worksheet.addRow({
        id: printArchive.id,
        en_title: word.en_title,
        jp_title: word.jp_title,
        type: word.type,
      });
    });
  });
};
