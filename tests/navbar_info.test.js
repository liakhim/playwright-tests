require('dotenv').config();

const { test, expect } = require('@playwright/test');
const { login, details } = require('../src/helpers');

test('Проверка названия плана:', async ({ page }) => {

    await page.goto('/');

    await login(page, process.env.USER_EMAIL, process.env.PASSWORD);

    const user_details = await details(page);

    const navbar_subscription_button = page.locator('._navbar__profile--button >> .blue-btn');
    await expect(navbar_subscription_button).toHaveText(user_details.subscription_info.active_subscription.plan_name + ' plan');
});