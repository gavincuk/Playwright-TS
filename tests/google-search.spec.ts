import { test, expect } from '@playwright/test';

// Test for Google Search

test('Google Search', async ({ page }) => {
    await page.goto('https://www.google.com');
    await page.fill('input[name="q"]', 'HSBC share price');
    await page.press('input[name="q"]', 'Enter');
    await expect(page).toHaveURL(/.*HSBC share price.*/);
    await expect(page.locator('text=HSBC Holdings plc')).toBeVisible();
});