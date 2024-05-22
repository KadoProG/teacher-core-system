/**
 * @jest-environment jsdom
 */
import { render, screen } from '@testing-library/react';
import { PrintLayoutContainer } from '@/components/commons/PrintLayoutContainer';

describe('PrintLayoutContainer', () => {
  test('should render correctly', () => {
    // Arrange
    const children = 'children';
    // Act
    render(<PrintLayoutContainer>{children}</PrintLayoutContainer>);
    // Assert
    expect(screen.getByText(children));
  });
});
