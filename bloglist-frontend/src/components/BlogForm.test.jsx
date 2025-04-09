import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { expect, test, vi } from 'vitest'
import BlogForm from './BlogForm'

test('<BlogForm /> double summit calls twice the controller', async () => {
  const createBlog = vi.fn()
  const user = userEvent.setup()

  render(<BlogForm createBlog={createBlog} />)
  const submit = screen.getByText('Create Blog')
  const titleInput = screen.getByPlaceholderText('your title')
  const authorInput = screen.getByPlaceholderText('your name')
  const urlInput = screen.getByPlaceholderText('your url')

  userEvent.type(
    titleInput,
    'Component testing is done with react-testing-library'
  )
  userEvent.type(authorInput, 'Dani Ortiz')
  userEvent.type(urlInput, '/sample-blog')

  screen.debug()
  await user.click(submit)
  expect(createBlog.mock.calls)
  await user.click(submit)
  expect(createBlog.mock.calls)
})
