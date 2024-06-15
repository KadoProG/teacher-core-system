import { convertToRomanNumeral } from '@/utils/convertToRomanNumeral';

describe('convertToRomanNumeral', () => {
  test('should return roman numeral correctly', () => {
    // Arrange
    const value = 1;
    // Act
    const result = convertToRomanNumeral(value);
    // Assert
    expect(result).toBe('Ⅰ');
  });
});
