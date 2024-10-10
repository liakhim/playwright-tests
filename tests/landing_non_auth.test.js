import { test, expect } from '@playwright/test';

test.describe('Landing Non Auth Tests', () => {

    test('0. Тест текста в кнопке', async ({ page }) => {
        await page.goto('https://staging.fanfrick.com/');
        const button = page.locator('.image-block__main-info >> button');
        await expect(button).toHaveText('Get started for free');
    });
    test('1. Тест перехода на страницу Support', async ({ page }) => {
        await page.goto('https://staging.fanfrick.com');
        await page.click('div.burger')
        const button = page.locator('.mobile-menu-content').locator('text=Support');
        await button.click();
        await page.waitForURL('/support');
        const send_button = page.locator('.support-wrap >> .button-box >> button')
        await expect(send_button).toHaveText('Send message for feedback');
    });

    test('2. Тест перехода на страницу Support через блок прайсинг', async ({ page }) => {
        await page.goto('https://staging.fanfrick.com');
        const button = page.locator('.price-plans__content').locator('.price-plans__content__item:has-text("Enterprise")').locator('.button-block >> button:has-text("Contact us")');
        await button.click();
        await page.waitForURL('/support');
        const send_button = page.locator('.support-wrap >> .button-box >> button')
        await expect(send_button).toHaveText('Send message for feedback');
    });
});