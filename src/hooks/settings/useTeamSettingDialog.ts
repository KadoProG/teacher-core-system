import React from 'react';
import { useForm } from 'react-hook-form';
import { useSnackbar } from '@/components/commons/feedback/SnackbarContext';
import { SELECT_NEW_OPTION_NAME } from '@/components/commons/input/FormSelect';
import { useAuth } from '@/libs/firebase/FirebaseAuthContext';
import { addTeam } from '@/utils/fetch/fetchTeam';

export const useTeamSettingDialog = () => {
  const { addMessageObject } = useSnackbar();
  const { user, teams, selectedTeamId, saveRecentTeamId } = useAuth();

  const [isNewTeam, setIsNewTeam] = React.useState<boolean>(false);

  const members = [
    {
      email: 'string@gmail.com',
      id: '1',
      name: 'サンプル太郎',
    },
    {
      email: 'string@gmail.com',
      id: '2',
      name: 'サンプル太郎',
    },
  ];
  const { control, handleSubmit, setValue, watch } = useForm<{
    teamId: string;
    addEmail: string;
    teamName: string;
  }>({
    defaultValues: { teamId: '', addEmail: '', teamName: '' },
  });

  const teamId = watch('teamId');

  React.useEffect(() => {
    // ユーザによってTeamIdが変更されたときの動作（新規モードを解除）
    if (teamId === SELECT_NEW_OPTION_NAME) {
      setIsNewTeam(true);
      setValue('teamName', '');
      return;
    }

    setIsNewTeam(false);
    // ロジックによってTeamIdが変更されたときの動作（初期化など）
    const currentTeam = teams.find((team) => teamId === team.id);
    if (currentTeam) {
      setValue('teamId', teamId);
      setValue('teamName', currentTeam.name);
      if (selectedTeamId !== teamId) {
        saveRecentTeamId(teamId);
      }
    }
  }, [setValue, teams, teamId, saveRecentTeamId, selectedTeamId]);

  React.useEffect(() => {
    if (!selectedTeamId) return;
    setValue('teamId', selectedTeamId);
  }, [selectedTeamId, setValue]);

  const teamOptions = teams.map((team) => ({
    label: team.name,
    value: team.id,
  }));

  const memberOptions = members.map((member) => ({
    label: member.name,
    value: member.id,
  }));

  const onMemberDelete = (value: string) => {
    console.log('delete member', value); // eslint-disable-line no-console
  };

  const onSubmit = React.useCallback(async () => {
    handleSubmit(async (formData) => {
      if (!user?.id) return;
      if (!formData.teamName) {
        addMessageObject('チーム名を入力してください', 'error');
        return;
      }
      const newTeam: ITeam = {
        name: formData.teamName,
        members: [user.id],
        sessions: [],
        created_at: new Date(),
        updated_at: new Date(),
      };
      try {
        await addTeam(newTeam, user.id);
        addMessageObject('チームを作成しました', 'success');
      } catch (error) {
        console.error(error); // eslint-disable-line no-console
      }
    })();
  }, [handleSubmit, addMessageObject, user?.id]);

  return {
    control,
    teamOptions,
    memberOptions,
    onMemberDelete,
    isNewTeam,
    selectedTeamId,
    onSubmit,
  };
};
