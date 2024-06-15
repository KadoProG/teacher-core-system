import { Box, SxProps, TextField, Typography } from '@mui/material';
import React from 'react';
import {
  FieldValues,
  UseControllerProps,
  useController,
} from 'react-hook-form';
import { RequiredLabel } from '@/components/commons/input/RequiredLabel';

type FormTextFieldProps<T extends FieldValues> = UseControllerProps<T> & {
  label: string;
  type: string;
  isRequired?: boolean;
  isDense?: boolean;
  placeholder?: string;
  fullWidth?: boolean;
  /**コンテナに対するスタイル設定 */
  sx?: SxProps;
};

export const FormTextField = <T extends FieldValues>(
  props: FormTextFieldProps<T>
) => {
  const controller = useController<T>({
    name: props.name,
    control: props.control,
    disabled: props.disabled,
    rules: {
      required: props.isRequired,
    },
  });
  return (
    <Box display="flex" alignItems="center" sx={props.sx}>
      {!props.isDense && (
        <Box width={180} position="relative">
          <Typography variant="body2">{props.label}</Typography>
          {props.isRequired && <RequiredLabel />}
        </Box>
      )}
      <Box width={props.isDense ? '100%' : undefined}>
        <TextField
          fullWidth={props.fullWidth}
          {...controller.field}
          size="small"
          type={props.type}
          id={`filled_${controller.field.name}`}
          label={props.label}
          InputLabelProps={{
            sx: {
              opacity: 0,
            },
          }}
          inputProps={{
            placeholder: props.placeholder,
            sx: {
              '+ fieldset legend': {
                display: 'none',
              },
            },
          }}
        />
      </Box>
    </Box>
  );
};
