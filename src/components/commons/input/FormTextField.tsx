import { Box, TextField, Typography } from '@mui/material';
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
};

export const FormTextField = <T extends FieldValues>(
  props: FormTextFieldProps<T>
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
      <Box width={180} position="relative">
        <Typography variant="body2">{props.label}</Typography>
        {props.isRequired && <RequiredLabel />}
      </Box>
      <Box>
        <TextField {...controller.field} size="small" type={props.type} />
      </Box>
    </Box>
  );
};
