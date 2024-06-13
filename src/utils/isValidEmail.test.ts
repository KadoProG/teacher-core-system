import { isValidEmail } from '@/utils/isValidEmail';

describe('isValidEmail', () => {
  test('should return true for valid email', () => {
    // Arrange
    const email = 'test@gmail.com';

    // Act
    const result = isValidEmail(email);

    // Assert
    expect(result).toBe(true);
  });

  test('should return false for invalid email', () => {
    // Arrange
    const email = 'test';

    // Act
    const result = isValidEmail(email);

    // Assert
    expect(result).toBe(false);
  });
});
