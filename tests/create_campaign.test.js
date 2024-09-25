require('dotenv').config();

const { test, expect } = require('@playwright/test');
const { login } = require('../src/helpers');

test('Проверка начала создания кампании', async ({ page }) => {

    const socials = [
        {name: 'TikTok', url: 'tiktok'},
        {name: 'Facebook', url: 'facebook'},
        {name: 'Instagram', url: 'instagram'},
        {name: 'X (Twitter)', url: 'twitter'},
        {name: 'Youtube', url: 'youtube'},
        {name: 'Linkedin', url: 'linkedin'},
        {name: 'Telegram channel', url: 'telegram_channel'}
    ];

    await page.goto('/');

    await login(page, process.env.USER_EMAIL, process.env.PASSWORD);

    for (let i = 0; i++; i < socials.length) {
        await page.goto('/my-gates');

        await page.click('._navbar__profile--button >> text="New campaign"')

        const modal = await page.locator('div[name="choose-social-fo-campaign"]');
        await expect(modal).toBeVisible();

        await page.click(`div[name="choose-social-fo-campaign"] >> text="${socials[i].name}"`)
        await page.click('div[name="choose-social-fo-campaign"] >> text="Create campaign"')

        await expect(page).toHaveURL(`/new-campaign/${socials[i].url}`);
    }
});