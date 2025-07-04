import { expect } from '@playwright/test'

const loginWith = async (page, username, password) => {
  await page.getByTestId('username').fill(username)
  await page.getByTestId('password').fill(password)
  await page.getByRole('button', { name: 'login' }).click()
}

const createBlog = async (page, content) => {
  const { title, author, url } = content
  await page.getByRole('button', { name: 'New Blog' }).click()
  await page.getByTestId('title').fill(title)
  await page.getByTestId('author').fill(author)
  await page.getByTestId('url').fill(url)
  await page.getByRole('button', { name: 'Create Blog' }).click()
  await page.getByRole('button', { name: 'Cancel' }).click()
  await page.waitForTimeout(400)
}
const logout = async (page) => {
  await page.getByRole('button', { name: 'logout' }).click()
}
const screenshot = async (page, filename) => {
  await page.screenshot({ path: filename })
}
const giveLikes = async (page, blogIndex, times) => {
  await page.getByRole('button', { name: 'View more' }).nth(blogIndex).click()
  for (let i = 0; i < times; i++) {
    await page.getByRole('button', { name: 'like' }).click()
  }
  await page.getByRole('button', { name: 'Hide' }).click()
}
const getLikes = async (page) => {
  await page.pause()
  
  const likeCount = []

 const likes = await page.getByTestId('likes').all()
 for (const like of likes) {
   likeCount.push(await like.innerText())
   console.log(likeCount)
   await page.pause()
 }

  return likeCount
}
export { loginWith, createBlog, logout, screenshot, giveLikes, getLikes }
