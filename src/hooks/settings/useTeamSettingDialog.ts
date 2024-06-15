import React from 'react';
import { useForm } from 'react-hook-form';
import useSWR from 'swr';
import { useSnackbar } from '@/components/commons/feedback/SnackbarContext';
import { SELECT_NEW_OPTION_NAME } from '@/components/commons/input/FormSelect';
import { useAuth } from '@/libs/firebase/FirebaseAuthContext';
import {
  addMemberToTeam,
  addTeam,
  deleteMemberFromTeam,
  fetchMembers,
} from '@/utils/fetch/fetchTeam';
import { isValidEmail } from '@/utils/isValidEmail';

export const useTeamSettingDialog = () => {
  const { addMessageObject } = useSnackbar();
  const { user, teams, selectedTeamId, saveRecentTeamId } = useAuth();

  const [isNewTeam, setIsNewTeam] = React.useState<boolean>(false);

  const currentTeam = React.useMemo(
    () => teams.find((team) => selectedTeamId === team.id),
    [teams, selectedTeamId]
  );

  const { data, mutate } = useSWR(currentTeam?.members ?? [], fetchMembers, {
    // 自動fetchの無効化
    revalidateIfStale: false,
    revalidateOnFocus: false,
    revalidateOnReconnect: false,
    onError: (error) => {
      console.error(error); // eslint-disable-line no-console
    },
  });

  const teamMembers = data?.members ?? [];

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

  const memberOptions = teamMembers.map((member) => ({
    label: member.name,
    value: member.id,
  }));

  const onMemberDelete = React.useCallback(
    async (value: string) => {
      try {
        await deleteMemberFromTeam(selectedTeamId, value);
        addMessageObject('メンバーを削除しました', 'success');
        mutate();
      } catch (error) {
        console.error(error); // eslint-disable-line no-console
        addMessageObject('メンバーの削除に失敗しました', 'error');
      }
    },
    [addMessageObject, selectedTeamId, mutate]
  );

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

  const onMemberAdd = React.useCallback(async () => {
    const email = watch('addEmail');
    if (!email) {
      addMessageObject('メールアドレスを入力してください', 'warning');
      return;
    }
    if (!isValidEmail(email)) {
      addMessageObject('メールアドレスが不正です', 'warning');
      return;
    }

    try {
      await addMemberToTeam(teamId, watch('addEmail'));
      addMessageObject('メンバーを追加しました', 'success');
      setValue('addEmail', '');
    } catch (error) {
      console.error(error); // eslint-disable-line no-console
      addMessageObject('メンバーの追加に失敗しました', 'error');
    }
  }, [teamId, watch, addMessageObject, setValue]);

  return {
    control,
    teamOptions,
    memberOptions,
    onMemberDelete,
    isNewTeam,
    selectedTeamId,
    onSubmit,
    onMemberAdd,
  };
};
