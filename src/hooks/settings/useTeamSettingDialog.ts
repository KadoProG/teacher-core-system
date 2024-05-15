import React from 'react';
import { useForm } from 'react-hook-form';
import { useAuth } from '@/libs/firebase/FirebaseAuthContext';

export const useTeamSettingDialog = () => {
  const { teams, selectedTeamId } = useAuth();

  const [isNewTeam, setIsNewTeam] = React.useState<boolean>(false);

  const handleSetNewTeam = () => {
    setIsNewTeam(true);
  };

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
  const { control } = useForm<{
    teamId: string;
    addEmail: string;
    teamName: string;
  }>({
    defaultValues: { teamId: '', addEmail: '', teamName: '' },
  });

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

  return {
    control,
    teamOptions,
    memberOptions,
    onMemberDelete,
    isNewTeam,
    handleSetNewTeam,
    selectedTeamId,
  };
};
