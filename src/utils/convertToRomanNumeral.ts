/**
 * ローマ数字を返す、１〜１２のみ、それ以外は空白で返す
 */
export const convertToRomanNumeral = (n: number): string => {
  if (n < 1 || n > 12) {
    return '';
  }

  const fullwidthRomanNumerals: string[] = [
    'Ⅰ',
    'Ⅱ',
    'Ⅲ',
    'Ⅳ',
    'Ⅴ',
    'Ⅵ',
    'Ⅶ',
    'Ⅷ',
    'Ⅸ',
    'Ⅹ',
    'Ⅺ',
    'Ⅻ',
  ];

  const result = fullwidthRomanNumerals[n - 1];
  return result;
};
