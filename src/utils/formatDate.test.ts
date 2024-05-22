import { formatDate } from '@/utils/formatDate';

describe('formatDate', () => {
  test('should format date correctly', () => {
    // Arrange
    const value = '2021-01-01T00:00:00.000Z';
    // Act
    const result = formatDate(value);
    // Assert
    expect(result).toBe('2021/01/01');
  });
});
