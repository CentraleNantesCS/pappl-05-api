import { BaseCommand } from '@adonisjs/ace'
import ExcelExport from 'App/Services/ExcelExport'

export default class ExportSheet extends BaseCommand {
  /**
   * Command Name is used to run the command
   */
  public static commandName = 'export:sheet'

  /**
   * Command Name is displayed in the "help" output
   */
  public static description = ''

  /**
   * Any settings a command wants to have. Helpful for third party
   * tools to read the settings in lifecycle hooks and make
   * certain decisions
   */
  public static settings = {
    loadApp: true,
    stayAlive: true,
  }

  public static flags = [
    {
      propertyName: 'id',
      name: 'id',
      type: 'number',
      default: 1,
      description: 'Calendar ID',
    },
  ]

  public async run(args) {
    const calendarID: number = this.parsed!.id
    ExcelExport.export(calendarID)
  }
}
