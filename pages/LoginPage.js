// pages/LoginPage.js
const { expect } = require('@playwright/test')

class LoginPage {
  constructor(page) {
    
    this.page = page

    this.inputEmail = page.getByPlaceholder('E-mail')
    this.inputPassword = page.getByPlaceholder('Senha')
    this.btnEntrar = page.getByRole('button', { name: /entrar/i })

    this.emailAlert = page.locator('span.email-alert')
    this.passwordAlert = page.locator('span.password-alert')
    
    this.toastError = page.getByText(/ocorreu um erro ao tentar efetuar o login/i)
  }

  async open() {
    await this.page.goto('http://localhost:3000/admin/login')
    const loginForm = this.page.locator('.login-form')
    await expect(loginForm).toBeVisible()
  }

  async fillEmail(value) {
    await this.inputEmail.fill(value)
  }

  async fillPassword(value) {
    await this.inputPassword.fill(value)
  }

  async submit() {
    await this.btnEntrar.click()
  }

  // Atalho para fazer login em uma linha
  async login(email, password) {
    await this.fillEmail(email)
    await this.fillPassword(password)
    await this.submit()
  }

 
  async expectOnLoginPage() {
    await this.page.waitForLoadState('networkidle')
    await expect(this.page).toHaveURL(/\/admin\/login$/)
  }

  
  async expectOnMoviesPage() {
    await this.page.waitForLoadState('networkidle')
    await expect(this.page).toHaveURL(/\/admin\/movies$/)
  }

  async expectInvalidCredentialsToast() {
    await expect(this.toastError).toBeVisible()
  }

  async expectNoInvalidCredentialsToast() {
    await expect(this.toastError).toHaveCount(0)
  }

  async expectEmailInvalidError() {
    await expect(this.emailAlert).toHaveText(/email incorreto/i)
  }

  async expectEmailRequiredError() {
    await expect(this.emailAlert).toHaveText(/campo obrigatório/i)
  }

  async expectPasswordRequiredError() {
    await expect(this.passwordAlert).toHaveText(/campo obrigatório/i)
  }
}

module.exports = { LoginPage }
