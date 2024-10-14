import { test, expect } from '@playwright/test';
import { AuthTest } from './AuthTest';
import fs from "fs";
import path from "path"; // Импортируем классы

const stateFilePath = path.join(__dirname, 'state.json');

test.use({
    storageState: fs.existsSync(stateFilePath) ? stateFilePath : undefined
});

test.describe('Ticket Tests', () => {
    // Используем AuthTest (с логином)
    test.beforeEach(async ({ page }) => {
        const testInstance = new AuthTest(page); // Класс с логином
        await testInstance.beforeEach(); // Логин будет выполнен перед каждым тестом
    });

    test('0. Тест перехода на страницу Support и создание тикета', async ({ page }) => {
        await page.goto('https://staging.fanfrick.com');
        await page.click('div.burger')
        const button = page.locator('.mobile-menu-content').locator('text=Support');
        await button.click();
        await page.waitForURL('/support');
        const send_button = page.locator('.support-wrap >> .button-box >> button')
        await expect(send_button).toHaveText('Create ticket');

        const date = new Date();
        const formattedDate = `${date.getFullYear()}-${(date.getMonth() + 1).toString().padStart(2, '0')}-${date.getDate().toString().padStart(2, '0')}`;

        const textarea = page.locator('textarea[name="support-comment"]');
        await textarea.fill('Auto-test message ['+ formattedDate +']!')
        
        await send_button.click();

        const success_message = page.locator('.success-custom >> .check >> p');
        await expect(success_message).toContainText('Thank you for your message!');
        await success_message.isVisible()
    });
});