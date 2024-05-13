import { useForm } from 'react-hook-form';

export const useTeamSettingDialog = () => {
  const teams = [
    { teamId: '1', teamName: 'Team 1' },
    { teamId: '2', teamName: 'Team 2' },
    { teamId: '3', teamName: 'Team 3' },
  ];

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
    label: team.teamName,
    value: team.teamId,
  }));

  const memberOptions = members.map((member) => ({
    label: member.name,
    value: member.id,
  }));

  const onMemberDelete = (value: string) => {
    // eslint-disable-next-line no-console
    console.log('delete member', value);
  };

  return { control, teamOptions, memberOptions, onMemberDelete };
};
