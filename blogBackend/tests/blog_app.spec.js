const { test, expect } = require('@playwright/test')

test.only('front page can be opened', async ({ page }) => {
  await page.goto('http://localhost:5173')

  const locator = await page.getByText('blogs')
  await expect(locator).toBeVisible()
  
})