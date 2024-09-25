require('dotenv').config();

const { test, expect } = require('@playwright/test');
const { login } = require("../src/helpers");

test('Проверка выхода', async ({ page }) => {
    await page.goto('/');

    await login(page, process.env.USER_EMAIL, process.env.PASSWORD);
    await page.goto('/my-gates');

    await page.click(".profileAvatar")
    await page.click('div._tooltip >> text="Log out"')

    // Проверка наличия определенного элемента
    await expect(page).toHaveURL('/');
});