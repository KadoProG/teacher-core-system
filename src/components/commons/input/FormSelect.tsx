import {
  Box,
  MenuItem,
  MenuItemProps,
  Select,
  SelectChangeEvent,
  Typography,
} from '@mui/material';
import React from 'react';
import {
  FieldValues,
  UseControllerProps,
  useController,
} from 'react-hook-form';

export const SELECT_NEW_OPTION_NAME = 'new_option' as const;

type FormSelectProps<T extends FieldValues> = UseControllerProps<T> & {
  label: string;
  isRequired?: boolean;
  options?: { label: string; value: MenuItemProps['value'] }[];
  isDense?: boolean;
  sx?: any;
  align?: 'left' | 'center' | 'right';
  onNewOptionClick?: () => void;
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

  const handleChange = React.useCallback(
    (event: SelectChangeEvent, children: React.ReactNode) => {
      const value = event.target.value as string;
      if (value === SELECT_NEW_OPTION_NAME && !!props.onNewOptionClick) {
        props.onNewOptionClick();
        controller.field.onChange(event, children);
      } else {
        controller.field.onChange(event, children);
      }
    },
    [controller.field, props]
  );

  const options = props.options || [];
  return (
    <Box display="flex" alignItems="center">
      {!props.isDense && (
        <Box width={180}>
          <Typography variant="body2">{props.label}</Typography>
        </Box>
      )}
      <Box flex={1} display="flex" justifyContent={props.align}>
        <Select
          {...controller.field}
          size="small"
          id={`filled_${controller.field.name}`}
          sx={props.sx}
          onChange={handleChange}
        >
          {options.map((option) => (
            <MenuItem key={option.label + option.value} value={option.value}>
              {option.label}
            </MenuItem>
          ))}
          {!!props.onNewOptionClick && (
            <MenuItem
              key={SELECT_NEW_OPTION_NAME}
              value={SELECT_NEW_OPTION_NAME}
            >
              新規追加
            </MenuItem>
          )}
        </Select>
      </Box>
    </Box>
  );
};
