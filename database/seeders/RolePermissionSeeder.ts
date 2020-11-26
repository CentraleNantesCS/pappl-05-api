import BaseSeeder from '@ioc:Adonis/Lucid/Seeder'
import Role from 'App/Models/Role'
import Logger from '@ioc:Adonis/Core/Logger'

export default class RolePermissionSeeder extends BaseSeeder {
  public async run() {
    const capitalize = (str: String) => `${str.charAt(0).toUpperCase()}${str.slice(1)}`
    const permissionsMap = {
      c: 'create',
      r: 'read',
      u: 'update',
      d: 'delete',
    }
    const roleStructure = {
      administrator: {
        User: 'c,r,u,d',
      },
    }

    const roles = await Role.all()
    roles
      .map((r: Role) => r.name)
      .forEach((role) => {
        Logger.info(`Create ${role} permissions: `)
        const models = roleStructure[role]
        for (const model in models) {
          Logger.info(`For the ${model} model: `)
          permissionsValues.forEach((permissionValue) => {
            const permissions = []
            Logger.info(`Creating ${permissionsMap[permissionValue]}:${model}`)
            permissions.push({
              name: `${permissionsMap[permissionValue]}:${model}`,
              display_name: `${capitalize(permissionsMap[permissionValue])} ${capitalize(model)}`,
            })
            // Find or create permission
            // await Role.firstOrCreate(searchPayload, savePayload)
          })
        }
      })
  }
}
