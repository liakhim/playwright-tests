import { test, expect } from '@playwright/test';
import { AuthTest } from './AuthTest';
import fs from "fs";
import path from "path"; // Импортируем классы

const stateFilePath = path.join(__dirname, 'state.json');

test.use({
    storageState: fs.existsSync(stateFilePath) ? stateFilePath : undefined
});

test.describe('Landing Tests', () => {

    // Используем AuthTest (с логином)
    test.beforeEach(async ({ page }) => {
        const testInstance = new AuthTest(page); // Класс с логином
        await testInstance.beforeEach(); // Логин будет выполнен перед каждым тестом
    });

    test('0. Тест текста на главной странице', async ({ page }) => {
        await page.goto('https://staging.fanfrick.com/');
        const title = page.locator('.image-block__main-info >> p');
        await expect(title).toHaveText('Encourage users to interact with your social network accounts to access special rewards. Build your audience on Facebook, Instagram, Twitter, YouTube, TikTok and Linkedin.');
    });

    test('1. Тест текста в кнопке', async ({ page }) => {
        await page.goto('https://staging.fanfrick.com/');
        const button = page.locator('.image-block__main-info >> button');
        await expect(button).toHaveText('My campaigns');
    });

    test('2. Тест текста в заголовке на странице кампаний', async ({ page }) => {
        await page.goto('https://staging.fanfrick.com/my-gates');
        const header = page.locator('h2');
        await expect(header).toHaveText('Campaigns');
    });

    test('3. Тест текста в первом блоке на главной', async ({ page }) => {
        await page.goto('https://staging.fanfrick.com');
        const title = page.locator('.grow-block__content >> .title >> h2');
        await expect(title).toHaveText('Use Fanfrick to give your existing and new audience incentives and gifts for real action on your social channel. Increase your audience size and loyalties');
    });

    test('4. Тест перехода на страницу How it works', async ({ page }) => {
        await page.goto('https://staging.fanfrick.com');
        const button = page.locator('.grow-block__content >> .grow-block-button');
        await expect(button).toHaveText('How it works');
        await button.click();
        await page.waitForURL('/how-it-works');
    });

    test('5. Тест перехода на страницу Support', async ({ page }) => {
        await page.goto('https://staging.fanfrick.com');
        const button = page.locator('.price-plans__content__item.dark >> .button-block >> button');
        await expect(button).toHaveText('CONTACT US');
        await button.click();
        await page.waitForURL('/support');
    });
});