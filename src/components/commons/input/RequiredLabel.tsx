import { Chip, Typography } from '@mui/material';

/**
 * 「必須」ラベル
 */
export const RequiredLabel = () => (
  <Chip
    label="必須"
    component={Typography}
    size="small"
    color="error"
    position="absolute"
    right={10}
    top={-10}
  />
);
