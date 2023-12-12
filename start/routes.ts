import Route from '@ioc:Adonis/Core/Route'

/**
 * Views Routes
 */

Route.get('/', async ({ inertia }) => {
  return inertia.render('Home')
})
Route.get('/signup', async ({ inertia, auth }) => {
  console.log(auth.isLoggedIn)
  return inertia.render('Register')
})
Route.get('/login', async ({ inertia }) => {
  return inertia.render('Login')
})
Route.get('/dashboard', async ({ inertia, auth }) => {
  return inertia.render('Dashboard', {
    user: auth.user,
  })
}).middleware('auth')
Route.get('/profile', async ({ inertia, auth }) => {
  return inertia.render('Profile', {
    user: auth.user,
  })
}).middleware('auth')
Route.get('/nouvelle-publication', async ({ inertia }) => {
  return inertia.render('NewPost')
}).middleware('auth')
Route.get('/clock', async ({ inertia }) => {
  return inertia.render('Clock')
})
Route.get('/event', 'CocksController.stream')

/**
 * Auth Routes
 */

// Register new user
Route.post('/signup', 'AuthController.Register')
Route.post('/login', 'AuthController.Login')
Route.post('/logout', 'AuthController.Logout')

/**
 * OpenAI
 */
Route.get('/openai', 'OpenAisController.generateText')
