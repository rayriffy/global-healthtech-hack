import dayjs from 'dayjs'

// Birthday: 1991-09-31

export const getAge = (birthday: string): number => dayjs().diff(dayjs(birthday), 'year')
