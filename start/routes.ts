import Route from '@ioc:Adonis/Core/Route'

/**
 * View Routes
 */

Route.get('/', async ({ inertia }) => {
  return inertia.render('Home')
})

/**
 * Auth Routes
 */
