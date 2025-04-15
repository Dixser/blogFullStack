import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { expect, test, vi } from 'vitest'
import BlogForm from './BlogForm'
const blogs = [
  {
    title: 'Component testing is done with react-testing-library',
    author: 'Dani Ortiz',
    url: '/sample-blog',
    likes: 5,
    user: {
      username: 'dortiz',
    },
  },
  {
    title: 'Mocking functions',
    author: 'Dani Ortiz',
    url: '/mocking-functions',
    likes: 2,
    user: {
      username: 'dortiz',
    },
  },
]
test('<BlogForm /> double summit calls twice the controller', async () => {
  const createBlog = vi.fn()
  const user = userEvent.setup()

  render(<BlogForm blogs={blogs} createBlog={createBlog} />)
  const submit = screen.getByText('Create Blog')
  const titleInput = screen.getByPlaceholderText('your title')
  const authorInput = screen.getByPlaceholderText('your name')
  const urlInput = screen.getByPlaceholderText('your url')

  await userEvent.type(
    titleInput,
    'Component testing is done with react-testing-library'
  )
  await userEvent.type(authorInput, 'Dani Ortiz')
  await userEvent.type(urlInput, '/sample-blog')

  expect(urlInput).toHaveValue('/sample-blog')

  await user.click(submit)
  expect(createBlog.mock.calls).toHaveLength(1)
  await user.click(submit)
  expect(createBlog.mock.calls).toHaveLength(2)
})
test('The object contains the valid data', async () => {
  const createBlog = vi.fn()
  const user = userEvent.setup()

  render(<BlogForm blogs={blogs} createBlog={createBlog} />)
  const submit = screen.getByText('Create Blog')
  const titleInput = screen.getByPlaceholderText('your title')
  const authorInput = screen.getByPlaceholderText('your name')
  const urlInput = screen.getByPlaceholderText('your url')

  await userEvent.type(
    titleInput,
    'Component testing is done with react-testing-library'
  )
  await userEvent.type(authorInput, 'Dani Ortiz')
  await userEvent.type(urlInput, '/sample-blog')

  expect(urlInput).toHaveValue('/sample-blog')
  await user.click(submit)

  expect(createBlog.mock.calls).toHaveLength(1)
  expect(createBlog.mock.calls[0][0].title).toBe('Component testing is done with react-testing-library')
  expect(createBlog.mock.calls[0][0].author).toBe('Dani Ortiz')
  expect(createBlog.mock.calls[0][0].url).toBe('/sample-blog')
})

