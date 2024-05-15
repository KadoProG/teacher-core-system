import exceljs from 'exceljs';

/**
 * ドロップされたExcelファイルを処理し、指定されたワークシートを取得する関数
 * @param acceptedFiles ファイルオブジェクト（一応配列のFile[]）
 * @param worksheetNames 取得するワークシートの名前
 * @returns 取得したワークシートの配列
 */
export const getWorksheetsFromExcelFile = async (
  acceptedFiles: File[],
  worksheetNames: string[]
): Promise<exceljs.Worksheet[]> => {
  try {
    const workbook = await loadWorkbookFromFile(acceptedFiles[0]);

    return worksheetNames
      .map((worksheetName) => workbook.getWorksheet(worksheetName))
      .filter((worksheet) => !!worksheet) as exceljs.Worksheet[];
  } catch (error) {
    throw new Error(`Excelデータの処理中にエラーが発生しました：${error}`);
  }
};

// ファイルからWorkbookを読み込む関数
const loadWorkbookFromFile = async (file: File): Promise<exceljs.Workbook> => {
  const blobURL = window.URL.createObjectURL(file);
  const response = await fetch(blobURL);
  const arrayBuffer = await response.arrayBuffer();
  const data = new Uint8Array(arrayBuffer);
  const workbook = new exceljs.Workbook();
  await workbook.xlsx.load(data);
  return workbook;
};
