require('dotenv').config();

const { test, expect } = require('@playwright/test');
const { login, details } = require('../src/helpers');

test('Проверка входа', async ({ page }) => {

    await page.goto('/');

    await login(page, process.env.USER_EMAIL, process.env.PASSWORD);

    // Проверка наличия определенного элемента
    const header = page.locator('h2');
    await expect(header).toHaveText('Campaigns');
});