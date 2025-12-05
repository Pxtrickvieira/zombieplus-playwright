const { expect } = require('@playwright/test')
const { executeSQL } = require('../tests/support/db')  


class MoviesPage {

  constructor(page) {
    this.page = page
    this.url = 'http://localhost:3000/admin/movies'


    this.btnAddMovie = this.page.locator('a[href$="/movies/register"]')

    this.inputTitle = page.getByLabel('Titulo do filme')
    this.inputOverview = page.getByLabel('Sinopse')

    this.selectCompany = page.locator('#select_company_id')
    this.selectYear = page.locator('#select_year')
    this.inputFile = page.locator('input[type="file"]')

    this.btnSubmit = page.getByRole('button', { name: 'Cadastrar' })

    this.toastSuccess = page.getByText(/cadastro realizado com sucesso/i)
  }

  async open() {
    await this.page.goto(this.url)
  }

  async openRegisterForm() {
    await this.btnAddMovie.click()
  }

  async fillForm({ title, overview, company, release_year, cover }) {

    await this.inputTitle.fill(title)
    await this.inputOverview.fill(overview)


    await this.selectCompany.click()
    await this.page.getByText(company, { exact: true }).click()


    await this.selectYear.click()
    await this.page.getByText(String(release_year), { exact: true }).click()

    // Upload do arquivo
    // await this.inputFile.setInputFiles(`tests/support/fixtures/${cover}`)
  }

  async submit() {
    await this.btnSubmit.click()
  }

  async expectMovieVisible(title) {
    await expect(this.page.getByText(title)).toBeVisible()
  }
  async expectMovieCreatedToast() {
    await expect(this.toastSuccess).toBeVisible()

  }
  async deleteMovieByTitle(title) {
    await executeSQL(
      'DELETE FROM movies WHERE title = $1',[title]
    )
  }
}

module.exports = { MoviesPage }
