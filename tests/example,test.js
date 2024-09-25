// tests/example.test.js
const { test, expect } = require('@playwright/test');

test('Проверка загрузки главной страницы', async ({ page }) => {
    await page.goto('/');
    // Проверка заголовка
    await expect(page).toHaveTitle(/Vue/);

    // Проверка наличия определенного элемента
    const header = page.locator('h1');
    await expect(header).toHaveText('Welcome to Your Vue.js App');
});