/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| This file is dedicated for defining HTTP routes. A single file is enough
| for majority of projects, however you can define routes in different
| files and just make sure to import them inside this file. For example
|
| Define routes in following two files
| ├── start/routes/cart.ts
| ├── start/routes/customer.ts
|
| and then import them inside `start/routes/index.ts` as follows
|
| import './cart'
| import './customer'
|
*/

import Route from '@ioc:Adonis/Core/Route'
import HealthCheck from '@ioc:Adonis/Core/HealthCheck'

Route.get('/', async () => {
  return { hello: 'world' }
})

Route.post('/login', 'AuthController.login')

Route.group(() => {
  Route.group(() => {
    Route.get('/', 'UsersController.currentUser')
  }).prefix('/user')
  // Resources routes
  Route.resource('users', 'UsersController').apiOnly()
  Route.resource('calendars', 'CalendarsController').apiOnly()
  Route.resource('classes', 'ClassesController').apiOnly()
  Route.resource('events', 'EventsController').apiOnly()
  Route.resource('periods', 'PeriodsController').apiOnly()
  Route.resource('specialisation', 'SpecialisationsController').apiOnly()
  Route.resource('subjects', 'SubjectsController').apiOnly()
}).prefix('/api')

Route.get('health', async ({ response }) => {
  const report = await HealthCheck.getReport()
  return report.healthy ? response.ok(report) : response.badRequest(report)
})
