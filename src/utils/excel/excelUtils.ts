import exceljs from 'exceljs';
/**
 * Excelのセルの値（オブジェクトを含む）をシンプルなString形式に変換する
 */
export const convertCellToString = (value: exceljs.CellValue) =>
  typeof value === 'string'
    ? value
    : typeof value === 'number'
      ? String(value)
      : (value as exceljs.CellRichTextValue).richText
          .map((v) => v.text)
          .join('');
