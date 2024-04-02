import React from 'react';

export const useTableRowCheckbox = (ids: number[]) => {
  const [selectedIds, setSelectedIds] = React.useState<number[]>(ids);
  const handleSingleClick = (id: number) => {
    if (selectedIds.includes(id)) {
      const newSelectedIds = selectedIds.filter((v) => v !== id);
      setSelectedIds([...newSelectedIds]);
    } else {
      setSelectedIds([...selectedIds, id]);
    }
  };

  const isAllSelected = selectedIds.length === ids.length;

  const handleAllClick = () => {
    if (isAllSelected) {
      setSelectedIds([]);
    } else {
      setSelectedIds(ids);
    }
  };

  return {
    /**
     * 選択されているID
     */
    selectedIds,
    /**
     * 単体チェック押下時の動作
     */
    handleSingleClick,
    /**
     * 全部チェック押下時の動作
     */
    handleAllClick,
    /**
     * 全ての行チェック状態
     */
    isAllSelected,
  };
};
