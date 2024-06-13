import exceljs from 'exceljs';
import { convertCellToString } from '@/utils/excel/excelUtils';
import { importExcelFromFile } from '@/utils/excel/importExcelFromFile';

/**
 * 印刷アーカイブのデータをExcelからインポートする関数
 * @param excelFile
 * @returns 印刷アーカイブデータ
 */
export const importPrintArchiveFromExcel = async (
  excelFile: File
): Promise<IEnglishWordPracPrint[]> => {
  const workbook = await importExcelFromFile(excelFile);

  const printArchiveSheet = workbook.getWorksheet('印刷アーカイブ');
  const printArchiveDetailSheet = workbook.getWorksheet('印刷アーカイブ詳細');

  if (!printArchiveSheet || !printArchiveDetailSheet) {
    throw new Error('指定されたワークシートが見つかりませんでした');
  }

  const printArchiveData = await processPrintArchiveSheet(
    printArchiveSheet,
    printArchiveDetailSheet
  );

  return printArchiveData;
};

/**
 * 印刷アーカイブのデータを処理する関数
 * @param printArchiveSheet
 * @param printArchiveDetailSheet
 * @returns
 */
const processPrintArchiveSheet = async (
  printArchiveSheet: exceljs.Worksheet,
  printArchiveDetailSheet: exceljs.Worksheet
) => {
  // 印刷アーカイブ詳細のデータを取得
  const printWords: {
    id: string;
    en_title: string;
    jp_title: string;
    type: 'en' | 'jp';
  }[] = [];

  printArchiveDetailSheet.eachRow((row, rowNumber) => {
    if (rowNumber === 1) return; // ヘッダー行はスキップ

    const idValue = row.getCell(1).value;
    const enTitleValue = row.getCell(2).value;
    const jpTitleValue = row.getCell(3).value;
    const typeValue = row.getCell(4).value;

    if (idValue && enTitleValue && jpTitleValue && typeValue) {
      const type = convertCellToString(typeValue);
      if (!(type === 'en' || type === 'jp')) {
        throw new Error(`${rowNumber}行目のtypeが不正です`);
      }
      const printWord = {
        id: convertCellToString(idValue),
        en_title: convertCellToString(enTitleValue),
        jp_title: convertCellToString(jpTitleValue),
        type: type as 'en' | 'jp',
      };
      printWords.push(printWord);
    }
  });

  // 印刷アーカイブのデータを取得
  const printArchiveData: IEnglishWordPracPrint[] = [];

  printArchiveSheet.eachRow((row, rowNumber) => {
    if (rowNumber === 1) return; // ヘッダー行はスキップ

    const idValue = row.getCell(1).value;
    const titleValue = row.getCell(2).value;
    const authorValue = row.getCell(3).value;
    const createdAtValue = row.getCell(4).value;

    if (idValue && titleValue && authorValue && createdAtValue) {
      const id = convertCellToString(idValue);
      const printArchive = {
        id,
        title: convertCellToString(titleValue),
        email: convertCellToString(authorValue),
        created_at: createdAtValue as Date,
        updated_at: new Date(),
        words: printWords.filter((word) => word.id === id),
      };
      printArchiveData.push(printArchive);
    }
  });

  return printArchiveData;
};
