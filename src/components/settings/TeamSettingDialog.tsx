import CloseIcon from '@mui/icons-material/Close';
import {
  Box,
  Button,
  Chip,
  Dialog,
  DialogContent,
  DialogTitle,
  Divider,
  IconButton,
  Stack,
  Typography,
} from '@mui/material';
import React from 'react';
import { FormSelect } from '@/components/commons/input/FormSelect';
import { FormTextField } from '@/components/commons/input/FormTextField';
import { useTeamSettingDialog } from '@/hooks/settings/useTeamSettingDialog';

interface TeamSettingDialogProps {
  open: boolean;
  onClose: () => void;
}
export const TeamSettingDialog: React.FC<TeamSettingDialogProps> = (props) => {
  const { control, teamOptions, memberOptions, onMemberDelete } =
    useTeamSettingDialog();
  return (
    <Dialog open={props.open} fullWidth maxWidth="xs" onClose={props.onClose}>
      <DialogTitle id="team-setting-dialog-title">
        <Box display="flex" justifyContent="space-between" alignItems="center">
          <Typography variant="h6" component="h2">
            チーム
          </Typography>
          <IconButton onClick={props.onClose} size="small">
            <CloseIcon />
          </IconButton>
        </Box>
        <Divider />
      </DialogTitle>
      <DialogContent>
        <FormSelect
          name="teamId"
          align="right"
          sx={{ width: 120 }}
          control={control}
          label="選択中のチーム"
          options={teamOptions}
        />
        <Divider sx={{ my: 2 }} />
        <Typography variant="body2" my={1} color="GrayText">
          メンバー
        </Typography>
        <FormTextField
          isDense
          fullWidth
          label="メールアドレスを追加"
          control={control}
          name="addEmail"
          type="email"
        />
        <Stack spacing={1}>
          {memberOptions.map((member) => (
            <Box key={member.value}>
              <Chip
                label={member.label}
                size="small"
                onDelete={() => onMemberDelete(member.value)}
              />
            </Box>
          ))}
        </Stack>
        <Typography variant="body2" my={1} color="GrayText">
          チーム設定
        </Typography>
        <FormTextField
          isDense
          fullWidth
          label="チーム名"
          control={control}
          name="teamName"
          type="string"
        />
        <Box py={2}>
          <Button color="error" variant="contained">
            チームを削除する
          </Button>
        </Box>
      </DialogContent>
    </Dialog>
  );
};
