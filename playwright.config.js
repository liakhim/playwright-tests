// playwright.config.js
const { defineConfig } = require('@playwright/test');

module.exports = defineConfig({
    use: {
        // Указываем браузеры по умолчанию
        browserName: 'chromium',
        headless: false, // Запуск в видимом режиме
        viewport: { width: 1280, height: 720 },
        baseURL: 'http://localhost:3000', // URL вашего приложения
    },
    testDir: './tests', // Директория с тестами
    retries: 1, // Количество попыток на случай падения теста
});