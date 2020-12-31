import Logger from '@ioc:Adonis/Core/Logger'
import Calendar from 'App/Models/Calendar'
import * as ExcelJS from 'exceljs'
import {
  add,
  eachWeekOfInterval,
  format,
  getWeek,
  Interval,
  isBefore,
  isWithinInterval,
} from 'date-fns'
import { getDateOfISOWeek, dayPeriodToInterval, getTime, eventToString } from './ExcelExportHelpers'
import Event from 'App/Models/Event'
import * as STC from 'string-to-color'
import Application from '@ioc:Adonis/Core/Application'

const PERIOD_WIDTH = 40
const PERIOD_HEIGHT = 45
const SMALL_WIDTH = 4
const YEAR_START_WEEK_NUMBER = 36
const YEAR_END_WEEK_NUMBER = 27
const DAYS_OF_WEEK = ['Lundi', 'Mardi', 'Mercredi', 'Jeudi', 'Vendredi']
export const TIME_PERIODS = {
  m1: {
    start: '08:00',
    end: '10:00',
  },
  m2: {
    start: '10:15',
    end: '12:15',
  },
  s1: {
    start: '13:45',
    end: '15:45',
  },
  s2: {
    start: '16:00',
    end: '18:00',
  },
}

const TIME_PERIODS_ARRAY = Object.keys(TIME_PERIODS).map((v) => v.toUpperCase())

const WEEK_COLUMNS = []

DAYS_OF_WEEK.forEach((day) => {
  TIME_PERIODS_ARRAY.forEach((period) => {
    WEEK_COLUMNS.push({
      header: `${day}-${period}`,
      key: `${day.toLowerCase()}.${period.toLowerCase()}`,
      width: PERIOD_WIDTH,
    })
  })
})

interface WorksheetColumns {
  week: number
  period: string
  weekStart: Date
  weekEnd: Date
  separator: string
  [key: string]: any
}

class ExcelExport {
  private workbook: ExcelJS.Workbook
  public weekColumns: ExcelJS.Column

  constructor() {
    this.workbook = new ExcelJS.Workbook()
    this.workbook.addWorksheet('Emploi du temps')
  }

  /**
   * setColumns
   */
  public setColumns() {
    this.sheet.columns = [
      { header: 'N°', key: 'week', width: SMALL_WIDTH },
      { header: 'P°', key: 'period', width: SMALL_WIDTH },
      { header: 'Du', key: 'weekStart', width: 20 },
      { header: '-', key: 'separator', width: SMALL_WIDTH },
      { header: 'Au', key: 'weekEnd', width: 20 },
      ...WEEK_COLUMNS,
    ]
  }

  /**
   * setHeaders
   */
  public setHeaders() {
    // Set first row
    const topRow = this.sheet.getRow(1)
    let startColumn = 6
    const mergedCellCount = TIME_PERIODS_ARRAY.length
    // Set the week days
    DAYS_OF_WEEK.forEach((day) => {
      this.sheet.mergeCells(1, startColumn, 1, startColumn + mergedCellCount - 1)
      this.sheet.getCell(1, startColumn).value = day
      startColumn += mergedCellCount
    })

    // Reset "cursor"
    startColumn = 6

    // Set 2nd row
    DAYS_OF_WEEK.forEach((day) => {
      for (let i = 0; i < TIME_PERIODS_ARRAY.length; i++) {
        const period = TIME_PERIODS_ARRAY[i]
        this.sheet.getCell(2, startColumn + i).value = period
      }
      startColumn += mergedCellCount
    })
  }

  public get sheet(): ExcelJS.Worksheet {
    return this.workbook.worksheets[0]
  }

  public yearWeeks(year: number): Date[] {
    return eachWeekOfInterval(
      {
        start: getDateOfISOWeek(YEAR_START_WEEK_NUMBER, year),
        end: getDateOfISOWeek(YEAR_START_WEEK_NUMBER, year + 1),
      },
      { weekStartsOn: 1 } // Always start on monday
    )
  }

  /**
   * setYearSchedule
   * @param startYear
   */
  public setYearSchedule(startYear: number, events: Event[]) {
    const yearWeekDates = this.yearWeeks(startYear)
    yearWeekDates.forEach((weekDate) => this.setWeekSchedule(weekDate, events))
  }

  /**
   * setWeekSchedule
   */
  public setWeekSchedule(weekDate: Date, events: Event[]) {
    const weekNumber = getWeek(weekDate, {
      weekStartsOn: 1, // Always start on monday
    })
    const weekSchedule = {}

    WEEK_COLUMNS.map(({ key }): ExcelJS.Column => key).forEach((key) => {
      // period: M1,M2 ...etc
      const [day, period] = key.split('.')
      const dayIndex = DAYS_OF_WEEK.map((day) => day.toLowerCase()).indexOf(day)

      const interval = dayPeriodToInterval(weekDate, dayIndex, period)
      const periodEvents = events.filter(
        (event) => isWithinInterval(event.start, interval) && isWithinInterval(event.end, interval)
      )
      if (periodEvents.length > 0) {
        let cellContent = `${getTime(interval.start)} - ${getTime(interval.end)}`
        periodEvents.forEach((event) => {
          cellContent = `${eventToString(event)} \r\n ${cellContent}`
        })
        weekSchedule[key] = cellContent
      }
    })

    const rowData: WorksheetColumns = {
      week: weekNumber,
      weekStart: format(weekDate, 'dd/MM/yyyy'),
      separator: '-',
      weekEnd: format(
        add(weekDate, {
          weeks: 1,
        }),
        'dd/MM/yyyy'
      ),
      ...weekSchedule,
    }

    this.sheet.addRow(rowData)
    this.sheet.lastRow?.height = PERIOD_HEIGHT
  }

  /**
   * export
   */
  public async export(calendarId: number, path: String | null = null) {
    Logger.info('Exporting Calendar #' + calendarId)
    try {
      const calendar = await Calendar.query()
        .where('id', calendarId)
        .preload('classe')
        .preload('specialisation')
        .preload('events', (query) => {
          query.preload('subject').preload('eventType').preload('host')
        })
        .first()

      const startYear = calendar?.classe.start_year

      this.setColumns()
      this.setHeaders()
      this.setYearSchedule(startYear, calendar?.events)
      if (!path) {
        await this.workbook.xlsx.writeFile('Export.xlsx')
      } else {
        await this.workbook.xlsx.writeFile(path)
      }
    } catch (error) {
      Logger.warn(error)
    }
  }
}

export default new ExcelExport()
