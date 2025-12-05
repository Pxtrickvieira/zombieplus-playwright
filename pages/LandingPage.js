// pages/LandingPage.js
const { expect } = require('@playwright/test')

class LandingPage {
  constructor(page) {
    this.page = page
    
    this.url = 'http://localhost:3000'
    this.btnAperteOPlay = page.getByRole('button', { name: /aperte o play/i })
    this.toastSuccess = page.getByText(/agradecemos por compartilhar seus dados conosco/i)
    this.toastError = page.getByText('O endereço de e-mail fornecido já está registrado em nossa fila de espera.')
  }

  async open() {
    await this.page.goto(this.url)
  }

  async openPreCadastroModal() {
    await this.btnAperteOPlay.click()
  }

  async expectToastSuccess() {
    await expect(this.toastSuccess).toBeVisible()
  }

  async expectNoToastSuccess() {
  await expect(this.toastSuccess).toHaveCount(0)
}

  async expectToastError() {
    await expect(this.toastError).toBeVisible()
  }

   async expectNoToastError() {
    await expect(this.toastError).toHaveCount(0)
  }
}

module.exports = { LandingPage }
