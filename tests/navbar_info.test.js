require('dotenv').config();

const { test, expect } = require('@playwright/test');
const { login, details, logger } = require('../src/helpers');
test('Проверка названия плана:', async ({ page }) => {

    await page.goto('/');

    await login(page, process.env.USER_EMAIL, process.env.PASSWORD);

    const user_details = await details(page);

    console.log('user_details')
    console.log(user_details.subscription_info.active_subscription.plan_name  + ' plan')

    const navbar_subscription_button = page.locator('._navbar__profile--button >> .blue-btn');
    await expect(navbar_subscription_button).toHaveText(user_details.subscription_info.active_subscription.plan_name + ' plan');

    await page.click(".profileAvatar")

    const tooltip_name_info = page.locator('._navbar >> ._navbar__profile >> ._tooltip-header__mail >> p')
    await expect(tooltip_name_info).toHaveText(user_details.name)

    await page.click('._navbar__profile--button >> .blue-btn')
    await expect(page).toHaveURL(`/pricing`);
});