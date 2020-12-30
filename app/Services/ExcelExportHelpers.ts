import Event from 'App/Models/Event'
import User from 'App/Models/User'
import { add, set, getHours, getMinutes } from 'date-fns'
import { TIME_PERIODS } from './ExcelExport'

/**
 * Taken from https://stackoverflow.com/a/16591175/3370660
 * @param weekNumber ISO week number
 * @param year Year
 */
export const getDateOfISOWeek = (weekNumber: number, year: Number) => {
  const simple = new Date(year, 0, 1 + (weekNumber - 1) * 7)
  const dow = simple.getDay()
  const ISOweekStart = simple
  if (dow <= 4) ISOweekStart.setDate(simple.getDate() - simple.getDay() + 1)
  else ISOweekStart.setDate(simple.getDate() + 8 - simple.getDay())
  return ISOweekStart
}

/**
 * Converts a week + day + period combo into and actual interval
 *
 * @param weekStartDate Week start date in ISO
 * @param dayIndex Day index (Monday being the 0th element of out DAYS_OF_WEEK array)
 * @param period Daily time period (M1, M2..etc) as defined in the TIME_PERIODS_ARRAY
 */
export const dayPeriodToInterval = (weekStartDate: Date, dayIndex: number, period: string) => {
  // Extract the time periods bounds
  const [startHours, startMinutes] = TIME_PERIODS[period].start.split(':')
  const [endHours, endMinutes] = TIME_PERIODS[period].end.split(':')

  // Assuming the weekstart date is always a monday, we can just add the date index
  const baseDate = add(weekStartDate, {
    days: dayIndex,
  })

  const interval = {
    start: set(baseDate, {
      hours: startHours,
      minutes: startMinutes,
    }),
    end: set(baseDate, {
      hours: endHours,
      minutes: endMinutes,
    }),
  }
  return interval
}

/**
 * Converts a date into a human readable time string
 *
 * @param date a valid date object
 */
export const getTime = (date: Date) => {
  return `${getHours(date).toString().padStart(2, '0')}h${getMinutes(date)
    .toString()
    .padStart(2, '0')}`
}

const fullNameOrAcronym = (u: User) => {
  return u.acronym ? u.acronym : `${u.firstname} ${u.lastname}`
}

export const eventToString = (event: Event) => {
  return `${event.eventType.acronym} - ${event.subject.acronym}${
    event.host ? ' - ' + fullNameOrAcronym(event.host) : ''
  }${event.remote ? ' - dist' : ''}`
}
