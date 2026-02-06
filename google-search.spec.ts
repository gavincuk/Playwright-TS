import { test, expect } from '@playwright/test';

test('Google Search', async ({ page }) => {
    // Step 1: Navigate to Google.com
    await page.goto('https://www.google.com', { waitUntil: 'networkidle' });
    
    // Step 2: Search for 'HSBC share price'
    await page.locator('textarea[name="q"]').click();
    await page.locator('textarea[name="q"]').fill('HSBC share price');
    await page.keyboard.press('Enter');
    
    // Wait for search results to load
    await page.waitForURL(/.*google.com\/search.*/);
    
    // Step 3: Assert for the text 'HSBC Holdings plc'
    await expect(page.locator('body')).toContainText('HSBC Holdings plc', { timeout: 10000 });
});