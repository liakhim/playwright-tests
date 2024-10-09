// require('dotenv').config();
//
// const { test, expect } = require('@playwright/test');
//
// const { login } = require('../src/helpers');
//
// test('Проверка входа', async ({ page }) => {
//
//     await page.goto('/');
//
//     await login(page, process.env.USER_EMAIL, process.env.PASSWORD);
//
//     // Проверка наличия определенного элемента
//     const header = page.locator('h2');
//     await expect(header).toHaveText('Campaigns');
// });

const { test, expect, chromium } = require('@playwright/test');

const { login } = require('../src/helpers');

let browser;
let context;
let page;

test.beforeAll(async () => {
    // Запускаем браузер
    browser = await chromium.launch();
    context = await browser.newContext();

    // Переходим на страницу и выполняем логин
    page = await context.newPage();

    await login(page, process.env.USER_EMAIL, process.env.PASSWORD);

    // Сохраняем cookies или localStorage
    await page.context().storageState({ path: 'state.json' });

    // await page.close();
});

test.beforeEach(async ({ page }) => {
    context = await browser.newContext({
        storageState: 'state.json', // Загружаем сессионные данные
    });
    await context.newPage();
});

test('Тест 1', async ({ page }) => {
    // Ваши тесты, не нужно логиниться заново
    await page.goto('https://staging.fanfrick.com/');

    const title = page.locator('.image-block__main-info >> p');
    await expect(title).toHaveText('Encourage users to interact with your social network accounts to access special rewards. Build your audience on Facebook, Instagram, Twitter, YouTube, TikTok and Linkedin.');
});

test('Тест 2', async ({ page }) => {
    // Ваши тесты, не нужно логиниться заново
    await page.goto('https://staging.fanfrick.com/');

    const button = page.locator('.image-block__main-info >> button');
    await expect(button).toHaveText('Get started for free');
});

test.afterAll(async () => {
    // Закрытие браузера после всех тестов
    await browser.close();
});