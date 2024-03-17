import { Box, Checkbox, FormControlLabel, Typography } from '@mui/material';
import React from 'react';
import {
  FieldValues,
  UseControllerProps,
  useController,
} from 'react-hook-form';

type FormCheckBoxProps<T extends FieldValues> = UseControllerProps<T> & {
  activeLabel?: string;
  negativeLabel?: string;
  label: string;
  name: string;
};

export const FormCheckBox = <T extends FieldValues>(
  props: FormCheckBoxProps<T>
) => {
  const controller = useController<T>({
    name: props.name,
    control: props.control,
  });

  return (
    <Box display="flex" alignItems="center">
      <Box width={180}>
        <Typography variant="body2">{props.label}</Typography>
      </Box>
      <Box>
        <FormControlLabel
          control={<Checkbox {...controller.field} />}
          label={
            controller.field.value ? props.activeLabel : props.negativeLabel
          }
        />
      </Box>
    </Box>
  );
};
