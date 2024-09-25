// tests/login.test.js
const { test, expect } = require('@playwright/test');
const { login } = require('../src/helpers');

test('Проверка входа', async ({ page }) => {
    await page.goto('/');

    await login(page, 'jhkjhkjhkjhkjh@bk.ru', 'jhkjhkjhkjhkjh@bk.ru');

    // Проверка наличия определенного элемента
    const header = page.locator('h2');
    await expect(header).toHaveText('Campaigns');
});