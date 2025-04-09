import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { expect, test, vi } from 'vitest'
import Blog from './Blog'

test('renders content', () => {
  const blog = {
    title: 'Component testing is done with react-testing-library',
    author: 'Dani Ortiz',
    url: '/sample-blog',
    likes: 5,
    user: {
      username: 'dortiz',
    },
  }

  const { container } = render(<Blog blog={blog} />)

  const title = screen.getByText(
    'Component testing is done with react-testing-library'
  )
  expect(title).toBeDefined()

  const author = screen.getByText('by Dani Ortiz')
  expect(author).toBeDefined()

  const url = screen.getByText('/sample-blog')
  expect(url).toBeDefined()

  const likes = screen.getByText('likes 5')
  expect(likes).toBeDefined()

  const mainContent = container.querySelector('.mainContent')
  expect(mainContent).toHaveTextContent(
    'Component testing is done with react-testing-library'
  )
  expect(mainContent).toHaveTextContent('Dani Ortiz')

  const hiddenContent = container.querySelector('.hiddenContent')
  expect(hiddenContent).toHaveTextContent('/sample-blog')
  expect(hiddenContent).toHaveTextContent('likes')
})
test('click on button changes displayed content', async () => {
  const blog = {
    title: 'Component testing is done with react-testing-library',
    author: 'Dani Ortiz',
    url: '/sample-blog',
    likes: 5,
    user: {
      username: 'dortiz',
    },
  }

  const mockHandler = vi.fn()

  const { container } = render(<Blog blog={blog} />)
  const hiddenContent = container.querySelector('.hiddenContent')
  expect(hiddenContent).toHaveStyle('display: none')

  const user = userEvent.setup()
  const button = screen.getByText('View more')
  await user.click(button)

  screen.getByText('Hide')
  expect(hiddenContent).not.toHaveStyle('display: none')
})
