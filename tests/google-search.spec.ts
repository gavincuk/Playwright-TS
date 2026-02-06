import { test, expect } from '@playwright/test';

test('Google Search', async ({ page }) => {
    // Step 1: Navigate to Google.com
    await page.goto('https://www.google.com', { waitUntil: 'domcontentloaded' });
    
    // Handle any consent popups by accepting cookies
    try {
        await page.getByRole('button', { name: /accept/i }).click({ timeout: 5000 });
    } catch {
        // Consent button not found, continue
    }
    
    // Step 2: Search for 'HSBC share price'
    const searchBox = page.locator('textarea[name="q"]');
    await searchBox.waitFor({ state: 'visible', timeout: 10000 });
    
    // Use type instead of fill to avoid click issues
    await searchBox.type('HSBC share price', { delay: 50 });
    
    // Press Enter to search
    await page.keyboard.press('Enter');
    
    // Wait for search results to load
    await page.waitForURL(/.*google.com\/search.*/, { timeout: 15000 });
    
    // Step 3: Assert for the text 'HSBC Holdings plc'
    await expect(page.locator('body')).toContainText('HSBC Holdings plc', { timeout: 10000 });
})