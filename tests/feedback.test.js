import { test, expect } from '@playwright/test';
import { AuthTest } from './AuthTest';
import fs from "fs";
import path from "path"; // Импортируем классы

const stateFilePath = path.join(__dirname, 'state.json');

test.describe('Feedback Tests', () => {

    test('5. Тест перехода на страницу Support', async ({ page }) => {
        await page.goto('https://staging.fanfrick.com');
        await page.click('div.burger')
        const button = page.locator('.mobile-menu-content').locator('text=Support');
        await button.click();
        await page.waitForURL('/support');
        const send_button = page.locator('.support-wrap >> .button-box >> button')
        await expect(send_button).toHaveText('Send message for feedback');

        const input_name = page.locator('input[placeholder="Name"]');
        await input_name.fill('Your Name');

        const input_email = page.locator('input[placeholder="Email address"]');
        await input_email.fill('test@mail.ru');

        const textarea = page.locator('textarea[name="support-comment"]');
        await textarea.fill('Lorem ipsum dolor sit amet, consectetur adipisicing elit. Asperiores, commodi!')
        
        await send_button.click();

        const success_message = page.locator('.success-custom >> .check >> p');
        await expect(success_message).toContainText('Thank you for your message!');
        await success_message.isVisible()
    });
});