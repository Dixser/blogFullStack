const { test, expect, beforeEach, describe } = require('@playwright/test')
const {
  loginWith,
  createBlog,
  logout,
  screenshot,
  giveLikes,
  getLikes,
} = require('./utils')

describe('Blog app', () => {
  beforeEach(async ({ page, request }) => {
    await request.post('http:localhost:3003/api/testing/reset')
    await request.post('http://localhost:3003/api/users', {
      data: {
        name: 'Superuser',
        username: 'root',
        password: 'sekret',
      },
    })

    await page.goto('http://localhost:5173')
  })

  test('Login form is shown', async ({ page }) => {
    const username = await page.getByText('username')
    await expect(username).toBeVisible()

    const password = await page.getByText('password')
    await expect(password).toBeVisible()
  })

  describe('Login', () => {
    test('succeeds with correct credentials', async ({ page }) => {
      await loginWith(page, 'root', 'sekret')

      const header = await page.getByText('blogs')
      await expect(header).toBeVisible()
    })

    test('fails with wrong credentials', async ({ page }) => {
      await loginWith(page, 'root', 'wrong')

      const errorMessage = await page.getByText('Wrong credentials')
      await expect(errorMessage).toBeVisible()
    })
  })

  describe('When logged in', () => {
    beforeEach(async ({ page }) => {
      await loginWith(page, 'root', 'sekret')
    })

    test('a new blog can be created', async ({ page }) => {
      await page.getByRole('button', { name: 'New Blog' }).click()
      await page.getByTestId('title').fill('Test blog')
      await page.getByTestId('author').fill('Test author')
      await page.getByTestId('url').fill('http://test.com')
      await page.getByRole('button', { name: 'Create Blog' }).click()

      const header = await page.getByText('Test blog')
      await expect(header).toBeVisible()
    })
  })
})

describe('Update and Delete', () => {
  beforeEach(async ({ page, request }) => {
    await page.goto('http://localhost:5173')
    await loginWith(page, 'root', 'sekret')
    await createBlog(page, {
      title: 'Test blog',
      author: 'Test author',
      url: 'http://test.com',
    })

    /*     await page.getByRole('button', { name: 'New Blog' }).click()
    await page.getByTestId('title').fill('Test blog')
    await page.getByTestId('author').fill('Test author')
    await page.getByTestId('url').fill('http://test.com')
    await page.getByRole('button', { name: 'Create Blog' }).click()
    await page.getByRole('button', { name: 'Cancel' }).click() */

    const header = await page.getByText('Test blog')
    await expect(header).toBeVisible()
  })
  test('a new blog can be edited', async ({ page }) => {
    const header = await page.getByText('Test blog')
    await expect(header).toBeVisible()
    await page.getByRole('button', { name: 'View More' }).first().click()
    await page.getByRole('button', { name: 'like' }).click()

    const likes = await page.getByText('likes 1')
    await expect(likes).toBeVisible()
    await page.getByRole('button', { name: 'Hide' }).click()
  })
  test('a new blog can be deleted', async ({ page }) => {
    await page.getByRole('button', { name: 'View More' }).first().click()
    await page.getByRole('button', { name: 'Delete blog' }).click()
    const header = await page.getByText('Test blog')
    await expect(header).toBeHidden()
  })
})
describe('Only User who created the blog can see Delete Button', () => {
  beforeEach(async ({ page, request }) => {
    await request.post('http:localhost:3003/api/testing/reset')

    await request.post('http://localhost:3003/api/users', {
      data: {
        name: 'Superuser',
        username: 'root',
        password: 'sekret',
      },
    })

    await request.post('http://localhost:3003/api/users', {
      data: {
        name: 'Newcomer',
        username: 'newcomer',
        password: 'sekret',
      },
    })

    await page.goto('http://localhost:5173')

    await loginWith(page, 'root', 'sekret')
    await createBlog(page, {
      title: 'Test blog',
      author: 'Test author',
      url: 'http://test.com',
    })
    await logout(page)
    await loginWith(page, 'newcomer', 'sekret')
  })
  test('cant delete blog', async ({ page }) => {
    await page.getByRole('button', { name: 'View More' }).first().click()
    await screenshot(page, 'screenshot.png')
    await expect(page.getByRole('button', { name: 'Delete blog' })).toBeHidden()
  })
})
describe.only('Likes are sorted by number', () => {
  beforeEach(async ({ page, request }) => {
    await request.post('http:localhost:3003/api/testing/reset')

    await request.post('http://localhost:3003/api/users', {
      data: {
        name: 'Superuser',
        username: 'root',
        password: 'sekret',
      },
    })

    await page.goto('http://localhost:5173')
    await loginWith(page, 'root', 'sekret')

    await createBlog(page, {
      title: 'Test blog',
      author: 'Test author',
      url: 'http://test1.com',
    })
    await createBlog(page, {
      title: 'Test blog 2',
      author: 'Test author',
      url: 'http://test2.com',
    })
    await createBlog(page, {
      title: 'Test blog 3',
      author: 'Test author',
      url: 'http://test3.com',
    })
  })
  test.only('likes are sorted by number', async ({ page }) => {
    await giveLikes(page, 0, 4)
    await giveLikes(page, 1, 7)
    await giveLikes(page, 2, 1)
    await page.reload()
    const likes = await getLikes(page)
    expect(likes).toEqual(['7', '4', '1'])
  })
})
