import exceljs from 'exceljs';

/**
 * Excelからファイルにエクスポートする関数
 * @param workbook エクスポートするワークブック
 * @param fileName ファイル名
 */
export const exportExcelToFile = async (
  workbook: exceljs.Workbook,
  fileName: string
) => {
  const buffer = await workbook.xlsx.writeBuffer();
  const blob = new Blob([buffer], {
    type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
  });
  const url = window.URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = fileName;
  a.click();
  window.URL.revokeObjectURL(url);
};
