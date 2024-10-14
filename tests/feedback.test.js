import { test, expect } from '@playwright/test';

test.describe('Feedback Tests', () => {

    test('0. Тест перехода на страницу Support и создание фидбэка', async ({ page }) => {
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

        const date = new Date();
        const formattedDate = `${date.getFullYear()}-${(date.getMonth() + 1).toString().padStart(2, '0')}-${date.getDate().toString().padStart(2, '0')}`;

        await textarea.fill('Auto-test message ['+ formattedDate +']!')
        
        await send_button.click();

        const success_message = page.locator('.success-custom >> .check >> p');
        await expect(success_message).toContainText('Thank you for your message!');
        await success_message.isVisible()
    });
});