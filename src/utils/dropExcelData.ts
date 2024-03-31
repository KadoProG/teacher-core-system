import exceljs from 'exceljs';

// ドロップされたExcelファイルを処理する関数
export const dropExcelData = async (
  acceptedFiles: File[],
  workbookName: string,
  processExcelData: (worksheet: exceljs.Worksheet) => Promise<void>
) => {
  try {
    const workbook = await fetchWorkbookFromFile(acceptedFiles[0]);
    const worksheet = workbook.getWorksheet(workbookName);
    if (worksheet) await processExcelData(worksheet);
  } catch (error) {
    throw new Error(`Excelデータの処理中にエラーが発生しました：${error}`);
  }
};

// ファイルからWorkbookを取得する関数
const fetchWorkbookFromFile = async (file: File): Promise<exceljs.Workbook> => {
  const blobURL = window.URL.createObjectURL(file);
  const response = await fetch(blobURL);
  const arrayBuffer = await response.arrayBuffer();
  const data = new Uint8Array(arrayBuffer);
  const workbook = new exceljs.Workbook();
  await workbook.xlsx.load(data);
  return workbook;
};
