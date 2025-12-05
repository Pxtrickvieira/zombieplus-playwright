const { expect } = require('@playwright/test')

class PreCadastroModal {

  constructor(page) {
    this.page = page

    this.modal = page.getByRole('dialog')
    this.inputName  = this.modal.getByPlaceholder('Informe seu nome')
    this.inputEmail = this.modal.getByPlaceholder('Informe seu email')
    this.btnSubmit = this.modal.getByRole('button', { name: /quero entrar na fila/i })
  }

  async expectVisible() {
    await expect(this.modal).toBeVisible()
  }

  async expectHidden() {
    await expect(this.modal).toBeHidden()
  }

  async fillName(value) {
    await this.inputName.fill(value)
  }

  async fillEmail(value) {
    await this.inputEmail.fill(value)
  }

  async submit() {
    await this.btnSubmit.click()
  }

 
  alertFor(field) {
    return this.modal.locator(`label[for="${field}"] .alert`)
  }
}

module.exports = { PreCadastroModal }
