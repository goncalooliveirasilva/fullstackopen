const { test, describe, beforeEach, expect } = require('@playwright/test')

describe('Blog app', () => {
  beforeEach(async ({ page, request }) => {
    await request.post('http://localhost:3003/api/testing/reset')
    await request.post('http://localhost:3003/api/users', {
      data: {
        name: 'Gonçalo',
        username: 'goncalo',
        password: 'segredo'
      }
    })
    await page.goto('http://localhost:5173')
  })

  test('Login form is shown', async ({ page }) => {
    await expect(page.getByText('Log in:')).toBeVisible()
    await expect(page.getByRole('button', { name: /Login/i })).toBeVisible()
  })

  describe('Login', () => {
    test('Succeeds with correct credentials', async ({ page }) => {
      await page.getByPlaceholder('Username').fill('goncalo')
      await page.getByPlaceholder('Password').fill('segredo')
      await page.getByRole('button', { name: /login/i }).click()
      await expect(page.getByText('Gonçalo logged in')).toBeVisible()
      const successNotification = page.locator('.notification')
      await expect(successNotification).toContainText('Login successfully :)')
      await expect(successNotification).toHaveCSS('background-color', 'rgb(0, 128, 0)')
    })

    test('Fails with wrong credentials', async ({ page }) => {
      await page.getByPlaceholder('Username').fill('goncalo')
      await page.getByPlaceholder('Password').fill('wrongpassword')
      await page.getByRole('button', { name: /login/i }).click()
      const errorNotification = page.locator('.notification')
      await expect(errorNotification).toContainText('Wrong username or password!')
      await expect(errorNotification).toHaveCSS('background-color', 'rgb(255, 0, 0)')
    })
  })

  describe('When logged in', () => {
    beforeEach(async ({ page }) => {
      await page.getByPlaceholder('Username').fill('goncalo')
      await page.getByPlaceholder('Password').fill('segredo')
      await page.getByRole('button', { name: /login/i }).click()
    })

    test('A new blog can be created', async ({ page }) => {
      await page.getByRole('button', { name: /new blog/i }).click()
      await page.getByPlaceholder('title').fill('test title')
      await page.getByPlaceholder('author').fill('test author')
      await page.getByPlaceholder('url').fill('test url')
      await page.getByRole('button', { name: /create/i }).click()
      const notification = page.locator('.notification')

      await expect(notification).toContainText('New Blog "test title" added!')
      await expect(notification).toHaveCSS('background-color', 'rgb(0, 128, 0)')
      await expect(page.locator('.blog-title', { hasText: 'test title' })).toHaveCount(1)
    })
  })
})