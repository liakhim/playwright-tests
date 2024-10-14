import { test, expect } from '@playwright/test';
import { AuthTest } from './AuthTest';
import fs from "fs";
import path from "path"; // Импортируем классы

const stateFilePath = path.join(__dirname, 'state.json');

test.use({
    storageState: fs.existsSync(stateFilePath) ? stateFilePath : undefined
});

test.describe('Tiktok Campaign Tests', () => {

    // Используем AuthTest (с логином)
    test.beforeEach(async ({ page }) => {
        const testInstance = new AuthTest(page); // Класс с логином
        await testInstance.beforeEach(); // Логин будет выполнен перед каждым тестом
    });

    test('0. Тест создания кампании Tiktok', async ({ page }) => {
        await page.goto('https://staging.fanfrick.com');
        await page.click('div.burger')
        const button = page.locator('.mobile-menu-content').locator('text=My Campaigns');
        await button.click();
        await page.waitForURL('/my-gates');
        const new_campaign_button = page.locator('._navbar__profile--button').locator('text=New campaign')
        await new_campaign_button.click();
        const modal = page.locator('.choose-social-fo-campaign')
        await modal.isVisible()
        const tiktok_button = page.locator('.social-link:has-text("TikTok")')
        await tiktok_button.click();
        const create_campaign_button = page.locator('.modal-footer >> button')
        await create_campaign_button.click();
        await page.waitForURL('/new-campaign/tiktok');

        const tiktok_step_block = page.locator(".accordion-item-social:has-text('TikTok')")
        await tiktok_step_block.isVisible()
        const activeClassAttribute = await tiktok_step_block.getAttribute('class')
        expect(activeClassAttribute).toContain('accordion-item-social-active')

        const save_and_publish_button = page.locator('.create-update-gate-confirm >> button');
        await save_and_publish_button.isDisabled()

        const url_block_input = page.locator('.input-wrap:has-text("Enter URL link to your offer")').locator('.input-control >> input')
        await url_block_input.fill('https://123.ru')
        await url_block_input.fill('')
        const url_input_error_block = page.locator('.input-wrap:has-text("Enter URL link to your offer")').locator(".errors-block")
        await url_input_error_block.isVisible()
        await url_block_input.fill('https://123.ru')
        await url_input_error_block.isVisible(false);

        const campaign_title_input = page.locator('.input-wrap:has-text("Campaign title")').locator('.input-control >> input')
        await campaign_title_input.fill('Campaign title')
        await campaign_title_input.fill('')
        const campaign_title_error_block = page.locator('.input-wrap:has-text("Campaign title")').locator(".errors-block")
        await campaign_title_error_block.isVisible()
        await campaign_title_input.fill('Campaign title')
        await campaign_title_error_block.isVisible(false);

        const campaign_description_input = page.locator('.input-wrap:has-text("Campaign description")').locator('.input-control >> textarea')
        await campaign_description_input.fill('Campaign description')
        await campaign_description_input.fill('')
        const campaign_description_error_block = page.locator('.input-wrap:has-text("Campaign description")').locator(".errors-block")
        await campaign_description_error_block.isVisible()
        await campaign_description_input.fill('Campaign description')
        await campaign_description_error_block.isVisible(false);

        const tiktok_step_url = tiktok_step_block.locator(".checks >> .checks-item-body >> .input-wrap:has-text('TikTok account')");
        const tiktok_step_url_input = tiktok_step_url.locator("input")
        const tiktok_step_url_errors_block = tiktok_step_url.locator(".errors-block >> .errors-block-message")
        await tiktok_step_url_input.fill('https://qwer.com/qweqwe')
        await tiktok_step_url_errors_block.isVisible()
        await tiktok_step_url_input.fill('')
        await tiktok_step_url_errors_block.isVisible()
        await tiktok_step_url_input.fill('https://tiktok/com/qwerty')
        await tiktok_step_url_errors_block.isVisible(false)

        await save_and_publish_button.isDisabled(false)
    });

    test('1. Тест создания кастомного линка', async ({ page }) => {
        await page.goto('https://staging.fanfrick.com/new-campaign/tiktok');
        const gate_link = page.locator(".gate-link")
        const switcher = page.locator(".gate-stage-title::has=text('Campaign link')")
        const tag_1_input = gate_link.locator(".input-wrap:has-text('Tag 1') >> input")
        const tag_2_input = gate_link.locator(".input-wrap:has-text('Tag 2') >> input")
        const save_custom_link_button = gate_link.locator(".save-button-block >> button")
    })

});