const loginWith = async (page, username, password) => {
  await page.getByPlaceholder('Username').fill(username)
  await page.getByPlaceholder('Password').fill(password)
  await page.getByRole('button', { name: /login/i }).click()
}

const createBlog = async (page, title, author, url) => {
  await page.getByRole('button', { name: /new blog/i }).click()
  await page.getByPlaceholder('title').fill(title)
  await page.getByPlaceholder('author').fill(author)
  await page.getByPlaceholder('url').fill(url)
  await page.getByRole('button', { name: /create/i }).click()
}

export { loginWith, createBlog }