import { Box, FormControlLabel, Switch, Typography } from '@mui/material';
import React from 'react';
import {
  FieldValues,
  UseControllerProps,
  useController,
} from 'react-hook-form';

type FormSwitchProps<T extends FieldValues> = UseControllerProps<T> & {
  activeLabel?: string;
  negativeLabel?: string;
  label: string;
  name: string;
  isDense?: boolean;
};

export const FormSwitch = <T extends FieldValues>(
  props: FormSwitchProps<T>
) => {
  const controller = useController<T>({
    name: props.name,
    control: props.control,
  });

  return (
    <Box display="flex" alignItems="center">
      {!props.isDense && (
        <Box width={180}>
          <Typography variant="body2">{props.label}</Typography>
        </Box>
      )}
      <Box>
        <FormControlLabel
          control={<Switch {...controller.field} />}
          label={
            controller.field.value ? props.activeLabel : props.negativeLabel
          }
        />
      </Box>
    </Box>
  );
};
