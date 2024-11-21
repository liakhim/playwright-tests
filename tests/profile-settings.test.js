import { test, expect } from '@playwright/test';
import { AuthTest } from './AuthTest';
import fs from "fs";
import path from "path"; // Импортируем классы

const stateFilePath = path.join(__dirname, 'state.json');

test.use({
    storageState: fs.existsSync(stateFilePath) ? stateFilePath : undefined
});

test.describe('Profile Tests', () => {

    // Используем AuthTest (с логином)
    test.beforeEach(async ({ page }) => {
        const testInstance = new AuthTest(page); // Класс с логином
        await testInstance.beforeEach(); // Логин будет выполнен перед каждым тестом
    });

    test('0. Тест перехода на страницу Profile и проверка first name, last name, email', async ({ page }) => {
        await page.goto('https://staging.fanfrick.com');
        await page.click('div.burger')
        const button = page.locator('.mobile-menu-content').locator('text=Profile settings');
        await button.click();
        await page.waitForURL('/profile-settings');

        await page.waitForSelector('.input-field__body.te input[type="email"]');

        const emailValue = await page.evaluate(() => {
            const input = document.querySelector('.input-field__body.te input[type="email"]');
            return input ? input.value : null;
        });
        const nameValue = await page.evaluate(() => {
            const input = document.querySelector('.input-field__body input[name="new_name"]');
            return input ? input.value : null;
        });

        const lastNameValue = await page.evaluate(() => {
            const input = document.querySelector('.input-field__body input[name="last_name"]');
            return input ? input.value : null;
        });

        expect(emailValue).toBe(process.env.USER_EMAIL);

        const user = await page.evaluate(() => {
            return JSON.parse(localStorage.getItem('user'));
        });

        expect(nameValue).toBe(user["first_name"]);
        expect(lastNameValue).toBe(user["last_name"]);
        expect(emailValue).toBe(user["email"]);
    });

    test('1. Тест перехода на страницу Profile и отображения всех подписок', async ({ page }) => {
        await page.goto('https://staging.fanfrick.com');
        await page.click('div.burger')
        const button = page.locator('.mobile-menu-content').locator('text=Profile settings');
        await button.click();
        await page.waitForURL('/profile-settings');

        const user = await page.evaluate(() => {
            return JSON.parse(localStorage.getItem('user'));
        });

        user.all_subscriptions.forEach(subscription => {
            console.log(subscription.plan_name)
            const subscription_line = page.locator('text="' + subscription.plan_name + '"');
            expect(subscription_line.isVisible());
        })
    });
});