import { Box, TextField } from '@mui/material';
import React from 'react';
import {
  FieldValues,
  UseControllerProps,
  useController,
} from 'react-hook-form';

type FormSearchFieldProps<T extends FieldValues> = UseControllerProps<T> & {
  label: string;
  isRequired?: boolean;
  placeholder?: string;
  fullWidth?: boolean;
  sx?: any;
};

/**
 * 検索用のテキストフィールド
 * @param props
 * @returns
 */
export const FormSearchField = <T extends FieldValues>(
  props: FormSearchFieldProps<T>
) => {
  const controller = useController<T>({
    name: props.name,
    control: props.control,
    rules: {
      required: props.isRequired,
    },
  });

  return (
    <Box display="flex" alignItems="center">
      <Box>
        <TextField
          {...controller.field}
          size="small"
          type="search"
          fullWidth={props.fullWidth}
          placeholder={props.placeholder}
          id={`filled_${controller.field.name}`}
          label={props.label}
          sx={props.sx}
        />
      </Box>
    </Box>
  );
};
