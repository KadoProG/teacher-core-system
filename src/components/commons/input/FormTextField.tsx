import { Box, TextField, Typography } from '@mui/material';
import React from 'react';

interface FormTextFieldProps {
  label: string;
  onChange: (str: string) => void;
  value: string;
  type: string;
}

export const FormTextField: React.FC<FormTextFieldProps> = (props) => (
  <Box display="flex" alignItems="center">
    <Box width={180}>
      <Typography variant="body2">{props.label}</Typography>
    </Box>
    <Box>
      <TextField type={props.type} value={props.value} size="small" />
    </Box>
  </Box>
);
