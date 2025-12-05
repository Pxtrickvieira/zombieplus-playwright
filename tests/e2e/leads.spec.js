import { expect } from '@playwright/test'
import { test } from '../support/index.js'
import { faker } from '@faker-js/faker'

test.describe('Pré-cadastro - Fila de Espera', () => {

  test.beforeEach(
    async ({ landingPage, preCadastroModal }) => {
    await landingPage.open()
    await landingPage.openPreCadastroModal()
    await preCadastroModal.expectVisible()

  })

  test('Usuário deve preencher o formulário e entrar na fila',
    async ({ landingPage, preCadastroModal }) => {

      const leadName = faker.person.fullName()
      const leadEmail = faker.internet.email()

      await preCadastroModal.fillName(leadName)
      await preCadastroModal.fillEmail(leadEmail)
      await preCadastroModal.submit()

      await preCadastroModal.expectHidden()
      await landingPage.expectToastSuccess()
    })

  test('Não deve cadastrar quando o email já está na fila de espera',
    async ({ landingPage, preCadastroModal, request }) => {

      const leadName = faker.person.fullName()
      const leadEmail = faker.internet.email()

      const newLead = await request.post('http://localhost:3333/leads', {
        data: {
          name: leadName,
          email: leadEmail
        }
      })

      expect(newLead.ok()).toBeTruthy()

      await landingPage.open()
      await landingPage.openPreCadastroModal()

      await preCadastroModal.fillName(leadName)
      await preCadastroModal.fillEmail(leadEmail)
      await preCadastroModal.submit()

      await landingPage.expectToastError()

    })


  test('Não deve cadastrar com email inválido',
    async ({ landingPage, preCadastroModal }) => {

      await preCadastroModal.fillName('João Testador')
      await preCadastroModal.fillEmail('joatest.com')
      await preCadastroModal.submit()

      await expect(preCadastroModal.alertFor('email')).toHaveText(/email incorreto/i)
      await landingPage.expectNoToastSuccess()
    })


  test('Não deve cadastrar quando o nome não é preenchido',
    async ({ landingPage, preCadastroModal }) => {

      await preCadastroModal.fillName('')
      await preCadastroModal.fillEmail('joatest@gmail.com')
      await preCadastroModal.submit()

      await expect(preCadastroModal.alertFor('name')).toHaveText(/campo obrigatório/i)
      await landingPage.expectNoToastSuccess()
    })


  test('Não deve cadastrar quando o email não é preenchido',
    async ({ landingPage, preCadastroModal }) => {

      await preCadastroModal.fillName('João')
      await preCadastroModal.fillEmail('')
      await preCadastroModal.submit()

      await expect(preCadastroModal.alertFor('email')).toHaveText(/campo obrigatório/i)
      await landingPage.expectNoToastSuccess()
    })


  test('Não deve cadastrar quando nenhum campo é preenchido',
    async ({ landingPage, preCadastroModal }) => {

      await preCadastroModal.fillName('')
      await preCadastroModal.fillEmail('')
      await preCadastroModal.submit()

      await expect(preCadastroModal.alertFor('name')).toHaveText(/campo obrigatório/i)
      await expect(preCadastroModal.alertFor('email')).toHaveText(/campo obrigatório/i)
      await landingPage.expectNoToastSuccess()     
    })
})
