import { test, expect } from '@playwright/test';
import { AuthTest } from './AuthTest';
import fs from "fs";
import path from "path"; // Импортируем классы

const stateFilePath = path.join(__dirname, 'state.json');

test.use({
    storageState: fs.existsSync(stateFilePath) ? stateFilePath : undefined
});

test.describe('Ticket Tests', () => {

    test('0. Тест перехода на страницу Support и создание тикета', async ({ page }) => {
        await page.goto('https://staging.fanfrick.com');
        await page.click('div.burger')
        const button = page.locator('.mobile-menu-content').locator('text=Support');
        await button.click();
        await page.waitForURL('/support');
        const send_button = page.locator('.support-wrap >> .button-box >> button')
        await expect(send_button).toHaveText('Create ticket');

        const textarea = page.locator('textarea[name="support-comment"]');
        await textarea.fill('Lorem ipsum dolor sit amet, consectetur adipisicing elit. Asperiores, commodi!')
        
        await send_button.click();

        const success_message = page.locator('.success-custom >> .check >> p');
        await expect(success_message).toContainText('Thank you for your message!');
        await success_message.isVisible()
    });
});