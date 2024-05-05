import CloseIcon from '@mui/icons-material/Close';
import {
  Box,
  Dialog,
  DialogContent,
  DialogTitle,
  Divider,
  IconButton,
  Typography,
} from '@mui/material';
import React from 'react';
import { useForm } from 'react-hook-form';
import { FormSelect } from '@/components/commons/input/FormSelect';
import {
  ColorModeChoice,
  useColorModeContext,
} from '@/libs/theme/themeRegistry';

interface SettingDialogProps {
  open: boolean;
  onClose: () => void;
}
export const SettingDialog: React.FC<SettingDialogProps> = (props) => {
  const { selectedMode, toggleColorMode } = useColorModeContext();

  const { control, watch } = useForm<{ colorTheme: ColorModeChoice }>({
    defaultValues: {
      colorTheme: selectedMode,
    },
  });

  const colorMode = watch('colorTheme');
  React.useEffect(() => {
    toggleColorMode(colorMode);
  }, [colorMode, toggleColorMode]);

  return (
    <Dialog open={props.open} fullWidth maxWidth="xs" onClose={props.onClose}>
      <DialogTitle id="setting-dialog-title">
        <Box display="flex" justifyContent="space-between" alignItems="center">
          <Typography variant="h6" component="h2">
            設定
          </Typography>
          <IconButton onClick={props.onClose} size="small">
            <CloseIcon />
          </IconButton>
        </Box>
        <Divider />
      </DialogTitle>
      <DialogContent>
        <FormSelect
          name="colorTheme"
          align="right"
          sx={{ width: 120 }}
          control={control}
          label="カラーモード"
          options={[
            { label: 'ライト', value: 'light' },
            { label: 'ダーク', value: 'dark' },
            { label: 'システム', value: 'device' },
          ]}
        />
      </DialogContent>
    </Dialog>
  );
};
