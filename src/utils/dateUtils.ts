import { format, parseISO, startOfWeek, endOfWeek, subWeeks, addDays, subDays, addWeeks, differenceInSeconds, differenceInMinutes, differenceInHours, differenceInDays, isValid } from 'date-fns'
import { enUS, es } from 'date-fns/locale'
import { toZonedTime, fromZonedTime } from 'date-fns-tz'

export const TIMEZONE = 'America/Bogota'

export const flatpickrConfig = {
  dateFormat: 'Y-m-d',
  altInput: true,
  altFormat: 'F j, Y',
}

export const flatpickrTimeConfig = {
  dateFormat: 'Y-m-d H:i',
  altInput: true,
  time_24hr: true,
  enableTime: true,
}

export const flatpickrTimeOnlyConfig = {
  enableTime: true,
  noCalendar: true,
  dateFormat: 'H:i',
  time_24hr: false,
  minuteIncrement: 1,
  wrap: false,
}

export const getCurrentFiscalYear = (): number => {
  return new Date().getFullYear()
}

export function formatDateWithMonthName(date: Date | string | null | undefined): string {
  if (!date) return ''

  try {
    const dateObj = typeof date === 'string' ? parseISO(date) : date
    if (!isValid(dateObj)) return String(date)
    const zonedDate = toZonedTime(dateObj, TIMEZONE)
    return format(zonedDate, 'MMMM d, yyyy', { locale: enUS })
  } catch (error) {
    console.error('Error formatting date:', error)
    return String(date)
  }
}

export function formatDateTimeWithMonthName(date: Date | string | null | undefined): string {
  if (!date) return ''

  try {
    const dateObj = typeof date === 'string' ? parseISO(date) : date
    if (!isValid(dateObj)) return String(date)
    const zonedDate = toZonedTime(dateObj, TIMEZONE)
    return format(zonedDate, 'MMMM d, yyyy hh:mm a', { locale: enUS })
  } catch (error) {
    console.error('Error formatting date:', error)
    return String(date)
  }
}

export function formatDateShort(date: Date | string | null | undefined): string {
  if (!date) return '-'

  try {
    const dateObj = typeof date === 'string' ? parseISO(date) : date
    if (!isValid(dateObj)) return '-'
    const zonedDate = toZonedTime(dateObj, TIMEZONE)
    return format(zonedDate, 'dd MMM, yyyy', { locale: enUS })
  } catch (error) {
    console.error('Error formatting date:', error)
    return '-'
  }
}

export function formatTime(date: Date | string | null | undefined): string {
  if (!date) return ''

  try {
    const dateObj = typeof date === 'string' ? parseISO(date) : date
    if (!isValid(dateObj)) return String(date)
    const zonedDate = toZonedTime(dateObj, TIMEZONE)
    return format(zonedDate, 'hh:mm a', { locale: enUS })
  } catch (error) {
    console.error('Error formatting time:', error)
    return String(date)
  }
}

export function getCurrentDateInTimezone(): Date {
  return toZonedTime(new Date(), TIMEZONE)
}

export function formatToYYYYMMDD(date: Date | string | null | undefined): string | null {
  if (!date) return null

  try {
    const dateObj = typeof date === 'string' ? parseISO(date) : date
    if (!isValid(dateObj)) return null
    const zonedDate = toZonedTime(dateObj, TIMEZONE)
    return format(zonedDate, 'yyyy-MM-dd')
  } catch (error) {
    console.error('Error formatting date:', error)
    return null
  }
}

export function formatToDateTimeAPI(date: Date | string | null | undefined): string | null {
  if (!date) return null

  try {
    const dateObj = typeof date === 'string' ? parseISO(date) : date
    if (!isValid(dateObj)) return null
    const zonedDate = toZonedTime(dateObj, TIMEZONE)
    return format(zonedDate, 'yyyy-MM-dd HH:mm:ss')
  } catch (error) {
    console.error('Error formatting datetime:', error)
    return null
  }
}

export const getCurrentLADate = (): string => {
  const zonedDate = toZonedTime(new Date(), TIMEZONE)
  return format(zonedDate, 'yyyy-MM-dd')
}

export const getYesterdayDate = (): string => {
  const zonedDate = toZonedTime(new Date(), TIMEZONE)
  return format(subDays(zonedDate, 1), 'yyyy-MM-dd')
}

export const getTomorrowDate = (): string => {
  const zonedDate = toZonedTime(new Date(), TIMEZONE)
  return format(addDays(zonedDate, 1), 'yyyy-MM-dd')
}

export const getCurrentLADateTime = (): string => {
  const zonedDate = toZonedTime(new Date(), TIMEZONE)
  return format(zonedDate, 'yyyy-MM-dd HH:mm:ss')
}

export function timeAgo(date: Date | string | null | undefined): string {
  if (!date) return 'Just now'

  try {
    const dateObj = typeof date === 'string' ? parseISO(date) : date
    if (!isValid(dateObj)) {
      console.warn('Invalid date:', date)
      return 'Invalid date'
    }

    const zonedDate = toZonedTime(dateObj, TIMEZONE)
    const now = toZonedTime(new Date(), TIMEZONE)

    const diffSeconds = differenceInSeconds(now, zonedDate)
    const diffMinutes = differenceInMinutes(now, zonedDate)
    const diffHours = differenceInHours(now, zonedDate)
    const diffDays = differenceInDays(now, zonedDate)

    if (diffSeconds < 10) return 'Just now'
    if (diffSeconds < 60) return `${diffSeconds} seconds ago`
    if (diffMinutes < 60) return `${diffMinutes} minutes ago`
    if (diffHours < 24) return `${diffHours} hours ago`
    if (diffDays < 7) return `${diffDays} days ago`
    return format(zonedDate, 'MMM d, yyyy')
  } catch (error) {
    console.error('Error calculating time ago:', error)
    return String(date)
  }
}

export function getCurrentWeekRange(): { start: string; end: string } {
  const zonedDate = toZonedTime(new Date(), TIMEZONE)
  const start = format(startOfWeek(zonedDate, { weekStartsOn: 1 }), 'yyyy-MM-dd')
  const end = format(endOfWeek(zonedDate, { weekStartsOn: 1 }), 'yyyy-MM-dd')

  return { start, end }
}

export function getPreviousWeekRange(): { start: string; end: string } {
  const zonedDate = toZonedTime(new Date(), TIMEZONE)
  const previousWeek = subWeeks(zonedDate, 1)
  const start = format(startOfWeek(previousWeek, { weekStartsOn: 1 }), 'yyyy-MM-dd')
  const end = format(endOfWeek(previousWeek, { weekStartsOn: 1 }), 'yyyy-MM-dd')

  return { start, end }
}

export function getNextWeekRange(): { start: string; end: string } {
  const zonedDate = toZonedTime(new Date(), TIMEZONE)
  const nextWeek = addWeeks(zonedDate, 1)
  const start = format(startOfWeek(nextWeek, { weekStartsOn: 1 }), 'yyyy-MM-dd')
  const end = format(endOfWeek(nextWeek, { weekStartsOn: 1 }), 'yyyy-MM-dd')

  return { start, end }
}

export function formatTimestamp(timestamp: { seconds: number; nanoseconds: number }): string {
  if (!timestamp) return ''

  const date = new Date(timestamp.seconds * 1000)
  const zonedDate = toZonedTime(date, TIMEZONE)
  const today = toZonedTime(new Date(), TIMEZONE)
  const weekStart = startOfWeek(today, { weekStartsOn: 0 })

  if (format(zonedDate, 'yyyy-MM-dd') === format(today, 'yyyy-MM-dd')) {
    return format(zonedDate, 'hh:mm a')
  } else if (zonedDate >= weekStart) {
    return format(zonedDate, 'EEEE', { locale: enUS })
  } else {
    return format(zonedDate, 'MM/dd/yyyy')
  }
}

export const formatMessageDate = (currentTimestamp: { seconds: number; nanoseconds: number } | null, previousTimestamp: { seconds: number; nanoseconds: number } | null): string | null => {
  if (!currentTimestamp) return null

  const currentDate = new Date(currentTimestamp.seconds * 1000)
  const previousDate = previousTimestamp ? new Date(previousTimestamp.seconds * 1000) : null

  const zonedCurrent = toZonedTime(currentDate, TIMEZONE)
  const zonedPrevious = previousDate ? toZonedTime(previousDate, TIMEZONE) : null

  if (zonedPrevious && format(zonedCurrent, 'yyyy-MM-dd') === format(zonedPrevious, 'yyyy-MM-dd')) {
    return null
  }

  return format(zonedCurrent, 'MMMM d, yyyy', { locale: enUS })
}

export const getMillis = (t: any): number => {
  if (!t) return 0
  if (typeof t.toMillis === 'function') return t.toMillis()
  if (t.seconds) return t.seconds * 1000 + Math.floor(t.nanoseconds / 1_000_000)
  return 0
}

export const getCurrentQuarter = (): { quarterStart: Date; quarterEnd: Date } => {
  const zonedDate = toZonedTime(new Date(), TIMEZONE)
  const currentMonth = zonedDate.getMonth()
  const quarter = Math.floor(currentMonth / 3)

  const quarterStart = new Date(zonedDate.getFullYear(), quarter * 3, 1)
  const quarterEnd = new Date(zonedDate.getFullYear(), quarter * 3 + 3, 0)

  return { quarterStart, quarterEnd }
}

export const toApiDateString = (date: Date | string | null | undefined): string | null => {
  return formatToYYYYMMDD(date)
}

export const toApiDateTimeString = (date: Date | string | null | undefined): string | null => {
  return formatToDateTimeAPI(date)
}

export function parseAPIDate(dateString: string): Date | null {
  if (!dateString) return null

  try {
    const normalized = dateString.replace(' ', 'T')
    const dateObj = parseISO(normalized)
    if (!isValid(dateObj)) return null
    return toZonedTime(dateObj, TIMEZONE)
  } catch (error) {
    console.error('Error parsing API date:', error)
    return null
  }
}

export function formatDateForDisplay(date: Date | string | null | undefined, formatStr: string = 'MMM d, yyyy'): string {
  if (!date) return '-'

  try {
    const dateObj = typeof date === 'string' ? parseISO(date) : date
    if (!isValid(dateObj)) return '-'
    const zonedDate = toZonedTime(dateObj, TIMEZONE)
    return format(zonedDate, formatStr, { locale: enUS })
  } catch (error) {
    console.error('Error formatting date:', error)
    return '-'
  }
}

export function formatDateSpanish(date: Date | string | null | undefined, formatStr: string = "d 'de' MMMM 'de' yyyy"): string {
  if (!date) return '-'

  try {
    const dateObj = typeof date === 'string' ? parseISO(date) : date
    if (!isValid(dateObj)) return '-'
    const zonedDate = toZonedTime(dateObj, TIMEZONE)
    return format(zonedDate, formatStr, { locale: es })
  } catch (error) {
    console.error('Error formatting date:', error)
    return '-'
  }
}
