import { render, screen } from '@testing-library/react'
import { userEvent } from '@testing-library/user-event'
import Blog from './Blog'

test('renders title and author by default', () => {
  const blog = {
    title: 'title test',
    author: 'author test',
    url: 'www.test.com',
    likes: 0
  }
  const { container } = render(<Blog blog={blog} />)

  const title = container.querySelector('.blog-title')
  const author = container.querySelector('.blog-author')
  const details = container.querySelector('.blog-details')

  expect(title).toHaveTextContent('title test')
  expect(author).toHaveTextContent('author test')
  expect(details).toBeNull()
})

test('renders url and likes after clicking the button', async () => {
  const blog = {
    title: 'title test',
    author: 'author test',
    url: 'www.test.com',
    likes: 0,
    user: { name: 'Gonçalo', username: 'goncalo' }
  }
  const mockHandler = vi.fn()
  const { container } = render(<Blog blog={blog} />)

  const user = userEvent.setup()
  const button = screen.getByText('View')
  await user.click(button)

  const url = container.querySelector('.blog-url')
  const likes = container.querySelector('.blog-likes')

  expect(url).toHaveTextContent('www.test.com').toBeInTheDocument()
  expect(likes).toHaveTextContent('0').toBeInTheDocument()
})