const { test, describe, beforeEach, expect } = require('@playwright/test')
const { loginWith, createBlog } = require('./helper')

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
      await loginWith(page, 'goncalo', 'segredo')
      await createBlog(page, 'test title', 'test author', 'test url')
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
      const blogs = page.locator('.blog-title', { hasText: 'test title' })
      expect(await blogs.count()).toBe(1)
    })

    test('Blog can be liked', async ({ page }) => {
      const blog = page.locator('.blog-title', { hasText: 'test title' })
      const blogDiv = blog.locator('../..')
      await blogDiv.getByRole('button', { name: /view/i }).click()
      
      const numberOfLikes = blogDiv.locator('.blog-likes')
      await expect(numberOfLikes).toContainText('0')
      
      await blogDiv.getByRole('button', { name: /like/i }).click()
      await expect(numberOfLikes).toContainText('1')
    })
    
    test('User who added the blog can delete the blog', async ({ page }) => {
      page.on('dialog', (dialog) => dialog.accept())

      const blog = page.locator('.blog-title', { name: 'test title' })
      const blogDiv = blog.locator('../..')
    
      await blogDiv.getByRole('button', { name: /view/i }).click()
      await blogDiv.getByRole('button', { name: /remove/i }).click()
    
      await expect(blog).toHaveCount(0)
    })

    test('Only the user who added the blog sees the blog\'s delete button', async ({ page, request }) => {
      // Create new user
      await page.getByRole('button', { name: /logout/i }).click()
      await request.post('http://localhost:3003/api/users', {
        data: {
          name: 'Other User',
          username: 'user',
          password: 'secret'
        }
      })

      await loginWith(page, 'user', 'secret')
      await expect(page.getByText('Other User logged in')).toBeVisible()

      const blog = page.locator('.blog-title', { name: 'test title' })
      const blogDiv = blog.locator('../..')
      await blogDiv.getByRole('button', { name: /view/i }).click()
      await expect(blogDiv.getByRole('button', { name: /remove/i })).toHaveCount(0)
    })
  })
})