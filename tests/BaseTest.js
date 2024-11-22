import fs from 'fs';
import path from 'path';
import { login } from '../src/helpers';
import { test } from '@playwright/test';
const stateFilePath = path.join(__dirname, 'state.json');

export class BaseTest {
    constructor(page) {
        this.page = page;
    }

    async loadStateOrLogin(shouldLogin = true) {
        await this.page.goto('https://staging.fanfrick.com');

        const accessTokenExpireIn = await this.page.evaluate(() => {
            return localStorage.getItem('access_token_expire_in');
        });

        // проверяем есть ли сгенерированный стейт и не истекло ли в этом стейте время жизни токена
        if (!fs.existsSync(stateFilePath) || ((accessTokenExpireIn - Date.now()) / 1000 / 60 <= 0)) {
            // параметр который передается (требует ли логина проверяемая страница)
            if (shouldLogin) {
                await this.loginAndSaveState();
            }
        }
    }

    async loginAndSaveState() {
        // TODO: сделать проверку на нескольких пользователях (без подписки, с активной подпиской, с кастомной подпиской и т д)
        await login(this.page, process.env.USER_EMAIL, process.env.PASSWORD);

        // Сохранить состояние после успешного логина
        const storageState = await this.page.context().storageState();
        fs.writeFileSync(stateFilePath, JSON.stringify(storageState), 'utf-8');
    }
}