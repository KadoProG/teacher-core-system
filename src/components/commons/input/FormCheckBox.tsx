import { Box, Checkbox, FormControlLabel, Typography } from '@mui/material';
import React from 'react';

interface FormCheckBoxProps {
  isChecked: boolean;
  activeLabel?: string;
  negativeLabel?: string;
  label: string;
  onChange: (bool: boolean) => void;
}

export const FormCheckBox: React.FC<FormCheckBoxProps> = (props) => (
  <Box display="flex" alignItems="center">
    <Box width={180}>
      <Typography variant="body2">{props.label}</Typography>
    </Box>
    <Box>
      <FormControlLabel
        control={
          <Checkbox onChange={(e) => props.onChange(e.target.checked)} />
        }
        checked={props.isChecked}
        label={props.isChecked ? props.activeLabel : props.negativeLabel}
      />
    </Box>
  </Box>
);
