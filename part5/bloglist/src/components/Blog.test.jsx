import { render, screen } from '@testing-library/react'
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