import { test, expect } from '@playwright/test';

test.describe('Landing Non Auth Tests', () => {

    test('0. Тест текста в кнопке', async ({ page }) => {
        await page.goto('https://staging.fanfrick.com/');
        const button = page.locator('.image-block__main-info >> button');
        await expect(button).toHaveText('Get started for free');
    });
});