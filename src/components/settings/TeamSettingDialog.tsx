import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import CloseIcon from '@mui/icons-material/Close';
import SendIcon from '@mui/icons-material/Send';
import {
  Alert,
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
  const {
    control,
    teamOptions,
    memberOptions,
    onMemberDelete,
    isNewTeam,
    selectedTeamId,
    onSubmit,
    onMemberAdd,
  } = useTeamSettingDialog();

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
          control={control}
          label="選択中のチーム"
          options={teamOptions}
          isNewOption
        />
        <Divider sx={{ my: 2 }} />
        {isNewTeam && (
          <Alert color="warning" icon={<AddCircleOutlineIcon />}>
            <Typography>新しいチームの作成</Typography>
          </Alert>
        )}
        {!isNewTeam && !selectedTeamId && (
          <Alert color="warning" severity="warning">
            <Typography>チームが選択されていません</Typography>
          </Alert>
        )}

        <Typography variant="body2" my={1} color="GrayText">
          チーム名
        </Typography>
        <FormTextField
          isDense
          fullWidth
          label="チーム名"
          control={control}
          name="teamName"
          type="string"
          disabled={!isNewTeam && !selectedTeamId}
        />
        <Typography variant="body2" my={1} color="GrayText">
          メンバーの追加
        </Typography>
        <Box display="flex">
          <FormTextField
            isDense
            fullWidth
            label="メールアドレスを追加"
            control={control}
            name="addEmail"
            type="email"
            disabled={!isNewTeam && !selectedTeamId}
            sx={{ flex: 1 }}
          />
          <IconButton onClick={onMemberAdd}>
            <SendIcon />
          </IconButton>
        </Box>
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
        <Box py={2}>
          {!isNewTeam && !!selectedTeamId && (
            <Button color="error" variant="contained">
              チームを削除する
            </Button>
          )}
          {isNewTeam && (
            <Button
              color="warning"
              variant="outlined"
              fullWidth
              size="large"
              onClick={onSubmit}
            >
              チームを作成する
            </Button>
          )}
        </Box>
      </DialogContent>
    </Dialog>
  );
};
