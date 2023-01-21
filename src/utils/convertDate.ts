import { parseISO, format } from 'date-fns'

export const dateStringToTimestamp = (dateString: string) =>
  parseISO(dateString).getTime()

export const dateStringToDate = (dateString: string) =>
  format(parseISO(dateString), 'uuuu-LL-dd')

export const dateStringToTime = (dateString: string) =>
  format(parseISO(dateString), 'HH:mm')

export const dateStringToDateFormat = (dateString: string) =>
  format(parseISO(dateString), 'dd/LL/uuuu')

export const dateStringToYearMonth = (dateString: string) =>
  format(parseISO(dateString), 'LL/uuuu')

export const dateStringToDateTimeFormat = (dateString: string) =>
  format(parseISO(dateString), 'dd/LL/uuuu HH:mm')

export const dateTimeStringToDateTimeFormat = (dateTimeString: string) =>
  format(parseISO(dateTimeString), "uuuu-LL-dd'T'HH:mm:ss")

export const timestampToDateTimeFormat = (timestamp: number) =>
  format(timestamp, 'dd/LL/uuuu HH:mm')

export const timestampToDateTimeISO = (timestamp: number) =>
  format(timestamp, 'uuuu-LL-dd HH:mm')

export const timestampToDateString = (timestamp: number) =>
  format(timestamp, 'dd/LL/uuuu')
