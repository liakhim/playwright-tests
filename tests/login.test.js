import { test, expect } from '@playwright/test';
import fs from 'fs';
import path from 'path';
import {login} from "../src/helpers";

const stateFilePath = path.join(__dirname, 'state.json');

async function loginAndSaveState(page) {
    // Пример логина (замените на ваш процесс логина)
    await login(page, process.env.USER_EMAIL, process.env.PASSWORD);
    // Сохранить состояние после успешного логина
    const storageState = await page.context().storageState();
    fs.writeFileSync(stateFilePath, JSON.stringify(storageState));
}

test.use({storageState: stateFilePath})

test.describe('Landing Tests', () => {
    test.beforeEach(async ({ page }) => {
        if (fs.existsSync(stateFilePath)) {
            // Если файл состояния существует, используем его
            const storageState = JSON.parse(fs.readFileSync(stateFilePath, 'utf-8'));
        } else {
            // Если состояния нет, выполняем логин
            await loginAndSaveState(page);
        }
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
        await page.click('.grow-block__content >> .grow-block-button')
        await page.waitForURL('/how-it-works');
    });
});