import Route from '@ioc:Adonis/Core/Route'
import User from 'App/Models/User'

/**
 * Views Routes
 */

Route.get('/support', async ({ inertia }) => {
  return inertia.render('Support')
})
Route.get('/legal', async ({ inertia }) => {
  return inertia.render('Legal')
})

Route.get('/admin', 'AdminsController.getAllUser').middleware('isAdmin')

Route.get('/', async ({ inertia, auth }) => {
  return inertia.render('Dashboard', {
    user: auth.user,
  })
}).middleware(['auth', 'shareUserPosts'])
Route.get('/signup', async ({ inertia, auth }) => {
  console.log(auth.isLoggedIn)
  return inertia.render('Register')
})
Route.get('/login', async ({ inertia }) => {
  return inertia.render('Login')
})
Route.get('/profile', async ({ inertia, auth }) => {
  return inertia.render('Profile', {
    user: auth.user,
  })
}).middleware('auth')
Route.get('/nouvelle-publication', async ({ inertia }) => {
  return inertia.render('NewPost')
}).middleware('auth')
Route.get('/mes-publications', 'PostsListsController.getPosts').middleware('auth')

/**
 * Auth Routes
 */

// LinkedIn Auth
Route.get('/linkedin/redirect', async ({ ally }) => {
  return ally.use('linkedin').redirect()
})

Route.get('/linkedin/callback', async ({ ally, auth, response }) => {
  const linkedin = ally.use('linkedin')

  if (linkedin.accessDenied()) {
    return 'Access was denied'
  }

  if (linkedin.stateMisMatch()) {
    return 'Request expired. Retry again'
  }

  if (linkedin.hasError()) {
    return linkedin.getError()
  }

  const linkedInUser = await linkedin.user()
  console.log(linkedInUser)

  const user = await User.firstOrCreate(
    {
      email: linkedInUser.email ?? 'default@example.com',
    },
    {
      first_name: linkedInUser.original.localizedFirstName,
      last_name: linkedInUser.original.localizedLastName,
      avatar: linkedInUser.avatarUrl,
      linkedin_id: linkedInUser.original.id,
      linkedin_token: linkedInUser.token.token,
      email: linkedInUser.email ?? 'default@example.com',
    }
  )

  await auth.use('web').login(user)

  return response.redirect().toRoute('/')
})

// Register new user
Route.post('/signup', 'AuthController.Register')
Route.post('/login', 'AuthController.Login')
Route.post('/logout', 'AuthController.Logout')

/**
 * OpenAI
 */
Route.get('/openai', 'OpenAisController.generateText')

/**
 * Posts Routes
 */
Route.delete('/posts/:id', 'PostsListsController.delete').middleware('auth')
Route.post('/posts/:id/schedule', 'PostsListsController.update').middleware('auth')
Route.post('/posts/:id/publish', 'PublishToLinkedInsController.PublishToLinkedIn').middleware(
  'auth'
)
