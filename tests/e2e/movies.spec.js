import { test, expect } from '../support/index.js'
import movies from '../support/fixtures/movies.json'

test.describe('Filmes - Cadastro', () => {

  test.beforeEach(async ({ loginPage, moviesPage, db }) => {

    await db.deleteMovie('Guerra Mundial Z')

    await loginPage.open()
    await loginPage.login('admin@zombieplus.com', 'pwd123')
    await loginPage.expectOnMoviesPage()
  })

  test('deve cadastrar filme', async ({ moviesPage }) => {

    const movie = movies.guerra_mundial_z

    await moviesPage.openRegisterForm()
    await moviesPage.fillForm(movie)
    await moviesPage.submit()

    await moviesPage.expectMovieCreatedToast()
    await moviesPage.expectMovieVisible(movie.title)
  })
})
