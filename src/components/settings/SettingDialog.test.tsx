import { render, screen } from '@testing-library/react';
import React from 'react';
import { SettingDialog } from '@/components/settings/SettingDialog';
import { useColorModeContext } from '@/libs/theme/themeRegistry';

jest.mock('@/libs/theme/themeRegistry');

// 型定義のためにジェネリック型を使用
const mockUseColorModeContext = useColorModeContext as jest.MockedFunction<
  () => {
    selectedMode: 'light' | 'dark' | 'device';
    toggleColorMode: (mode: 'light' | 'dark' | 'device') => void;
  }
>;

describe('SettingDialog', () => {
  const mockOnClose = jest.fn();
  const mockToggleColorMode = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
    mockUseColorModeContext.mockReturnValue({
      selectedMode: 'light',
      toggleColorMode: mockToggleColorMode,
    });
  });

  it('should render the dialog when open is true', () => {
    render(<SettingDialog open={true} onClose={mockOnClose} />);

    expect(screen.getByText('設定')).toBeInTheDocument();

    // カラーモードのセレクトボックスが表示されているかどうかを確認
    expect(screen.getByText('カラーモード')).toBeInTheDocument();
  });

  it('should not render the dialog when open is false', () => {
    render(<SettingDialog open={false} onClose={mockOnClose} />);

    expect(screen.queryByText('設定')).not.toBeInTheDocument();
  });
});
