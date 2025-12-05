import { expect } from '@playwright/test'
import { test } from '../support/index.js'

test.describe('Login - Zombie+', () => {

  test.beforeEach(async ({ loginPage }) => {
    await loginPage.open()
    await loginPage.expectOnLoginPage()
  })

  test('Deve logar como administrador', async ({ loginPage }) => {
    await loginPage.login('admin@zombieplus.com', 'pwd123')
    await loginPage.expectOnMoviesPage()
  })

  test('Não deve permitir login com email inválido', async ({ loginPage }) => {
    await loginPage.fillEmail('emailerrado')
    await loginPage.fillPassword('pwd123')
    await loginPage.submit()

    await loginPage.expectEmailInvalidError()
    await loginPage.expectNoInvalidCredentialsToast()
  })

  test('Não deve permitir login com senha incorreta', async ({ loginPage }) => {
    await loginPage.login('admin@zombieplus.com', 'senhaerrada')
    await loginPage.expectInvalidCredentialsToast()
  })

  test('Não deve permitir login sem preencher o email', async ({ loginPage }) => {
    await loginPage.fillEmail('')
    await loginPage.fillPassword('pwd123')
    await loginPage.submit()

    await loginPage.expectEmailRequiredError()
    await loginPage.expectNoInvalidCredentialsToast()
  })

  test('Não deve permitir login sem preencher a senha', async ({ loginPage }) => {
    await loginPage.fillEmail('admin@zombieplus.com')
    await loginPage.fillPassword('')
    await loginPage.submit()

    await loginPage.expectPasswordRequiredError()
    await loginPage.expectNoInvalidCredentialsToast()
  })

  test('Não deve permitir login com ambos os campos vazios', async ({ loginPage }) => {
    await loginPage.submit()

    await loginPage.expectEmailRequiredError()
    await loginPage.expectPasswordRequiredError()
    await loginPage.expectNoInvalidCredentialsToast()
  })

})
