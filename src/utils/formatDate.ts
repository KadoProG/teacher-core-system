import dayjs, { Dayjs } from 'dayjs';

dayjs.locale('ja');

export const formatDate = (value: string | Date | Dayjs | undefined): string =>
  dayjs(value).format('YYYY/MM/DD');
