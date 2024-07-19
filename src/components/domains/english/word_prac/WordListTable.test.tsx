import { render, screen } from '@testing-library/react';
import React from 'react';
import { WordListTable } from '@/components/domains/english/word_prac/WordListTable';
import { useTableRowCheckbox } from '@/hooks/commons/useTableRowCheckbox';

const session: IEnglishWordPracSession = {
  id: 'test',
  title: 'テストタイトル',
  row: 1,
  memo: 'メモ',
  words: [
    {
      id: 'word1',
      row: 1,
      session_id: '',
      jp_title: '単語',
      en_title: 'word',
      study_year: '',
      memo: '',
      created_at: '2024-07-19T08:34:59.035Z' as unknown as Date,
      updated_at: '2024-07-19T08:34:59.035Z' as unknown as Date,
    },
    {
      id: 'word2',
      row: 2,
      session_id: '',
      jp_title: '単語',
      en_title: 'word',
      study_year: '',
      memo: '',
      created_at: '2024-07-19T08:34:59.035Z' as unknown as Date,
      updated_at: '2024-07-19T08:34:59.035Z' as unknown as Date,
    },
  ],
  created_at: '2024-07-19T08:34:59.035Z' as unknown as Date,
  updated_at: '2024-07-19T08:34:59.035Z' as unknown as Date,
};

const sessionNoWords: IEnglishWordPracSession = {
  id: 'test',
  title: 'テストタイトル',
  row: 1,
  memo: 'メモ',
  words: [],
  created_at: '2024-07-19T08:34:59.035Z' as unknown as Date,
  updated_at: '2024-07-19T08:34:59.035Z' as unknown as Date,
};

jest.mock('@/hooks/commons/useTableRowCheckbox');

const mockUseTableRowCheckbox = useTableRowCheckbox as jest.MockedFunction<
  typeof useTableRowCheckbox
>;

describe('WordListTable', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    mockUseTableRowCheckbox.mockReturnValue({
      selectedIds: [],
      handleSingleClick: jest.fn(),
      handleAllClick: jest.fn(),
      isAllSelected: false,
    });
  });

  it('should render skeletons when loading', () => {
    render(<WordListTable isLoading={true} />);

    expect(screen.getAllByRole('progressbar')).toHaveLength(11);
  });

  it('should render message when no words are available', () => {
    render(<WordListTable session={sessionNoWords} isLoading={false} />);

    expect(screen.getByText('単語はありません')).toBeInTheDocument();
  });

  it('should render table when words are available', () => {
    mockUseTableRowCheckbox.mockReturnValue({
      selectedIds: [],
      handleSingleClick: jest.fn(),
      handleAllClick: jest.fn(),
      isAllSelected: false,
    });

    render(<WordListTable session={session} isLoading={false} />);

    expect(screen.getByRole('table')).toBeInTheDocument();
    expect(screen.getAllByRole('row')).toHaveLength(3); // ヘッダー + 2 行
  });
});
