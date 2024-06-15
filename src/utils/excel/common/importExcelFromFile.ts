import exceljs from 'exceljs';

/**
 * ファイルからExcelを読み込む関数
 * @param file
 * @returns Excelのワークブック
 */
export const importExcelFromFile = async (
  file: File
): Promise<exceljs.Workbook> => {
  const blobURL = window.URL.createObjectURL(file);
  const response = await fetch(blobURL);
  const arrayBuffer = await response.arrayBuffer();
  const data = new Uint8Array(arrayBuffer);
  const workbook = new exceljs.Workbook();
  await workbook.xlsx.load(data);
  return workbook;
};
