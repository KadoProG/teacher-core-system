import {
  Box,
  MenuItem,
  MenuItemProps,
  Select,
  Typography,
} from '@mui/material';
import React from 'react';
import {
  FieldValues,
  UseControllerProps,
  useController,
} from 'react-hook-form';

type FormSelectProps<T extends FieldValues> = UseControllerProps<T> & {
  label: string;
  isRequired?: boolean;
  options?: { label: string; value: MenuItemProps['value'] }[];
  isDense?: boolean;
};

export const FormSelect = <T extends FieldValues>(
  props: FormSelectProps<T>
) => {
  const controller = useController<T>({
    name: props.name,
    control: props.control,
    rules: {
      required: props.isRequired,
    },
  });

  const options = props.options || [];
  return (
    <Box display="flex" alignItems="center">
      {!props.isDense && (
        <Box width={180}>
          <Typography variant="body2">{props.label}</Typography>
        </Box>
      )}
      <Box>
        <Select
          fullWidth
          {...controller.field}
          size="small"
          id={`filled_${controller.field.name}`}
          label={props.label}
        >
          {options.map((option) => (
            <MenuItem key={option.label + option.value} value={option.value}>
              {option.label}
            </MenuItem>
          ))}
        </Select>
      </Box>
    </Box>
  );
};
