import { render, screen } from '@testing-library/react'
import { userEvent } from '@testing-library/user-event'
import NewBlogForm from './NewBlogForm'
import blogService from '../services/blogs'

test('blog form creates new blog with right details', async () => {
  vi.mock('../services/blogs', () => ({
    default: {
      add: vi.fn()
    }
  }))

  blogService.add.mockResolvedValue({ title: 'test title', author: 'test author', url: 'test url' })

  const mockSetBlogs = vi.fn()
  const mockDisplayNotigics = vi.fn()
  const mockRef = { current: { toggleVisibility: vi.fn() } }

  render(
    <NewBlogForm
      setBlogs={mockSetBlogs}
      blogs={[]}
      displayNotifics={mockDisplayNotigics}
      ref={mockRef}
    />
  )

  const user = userEvent.setup()

  const titleInput = screen.getByPlaceholderText('title')
  const authorInput = screen.getByPlaceholderText('author')
  const urlInput = screen.getByPlaceholderText('url')
  const submitButton = screen.getByRole('button', { name: 'Create' })

  await userEvent.type(titleInput, 'test title')
  await userEvent.type(authorInput, 'test author')
  await userEvent.type(urlInput, 'test url')
  await userEvent.click(submitButton)

  expect(blogService.add).toHaveBeenCalledTimes(1)
  expect(blogService.add).toHaveBeenCalledWith({
    title: 'test title',
    author: 'test author',
    url: 'test url'
  })
})