import { test as base } from '@playwright/test'
import { LandingPage } from '../../pages/LandingPage.js'
import { LoginPage } from '../../pages/LoginPage.js'
import { MoviesPage } from '../../pages/MoviesPage.js'
import { PreCadastroModal } from '../../pages/PreCadastroModalPage.js'
import { executeSQL } from '../support/db.js'

export const test = base.extend({

  loginPage: async ({ page }, use) => {
    await use(new LoginPage(page))
  },

  moviesPage: async ({ page }, use) => {
    await use(new MoviesPage(page))
  },

  preCadastroModal: async ({ page }, use) => {
    await use(new PreCadastroModal(page))
  },

  landingPage: async ({page}, use) => {
    await use (new LandingPage (page) )
  },

  db: async ({}, use) => {
    await use({
      deleteMovie: async (title) => {
        return executeSQL('DELETE FROM movies WHERE title = $1', [title])
      },
      resetLeads: async () => {
        return executeSQL('DELETE FROM leads')
      },
      resetMovies: async () => {
        return executeSQL('DELETE FROM movies')
      }
    })
  }

})
