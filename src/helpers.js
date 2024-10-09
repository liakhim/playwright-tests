async function login(page, username, password) {
    // Переход на страницу логина
    await page.goto('https://staging.fanfrick.com');
    await page.click('div.burger')
    await page.click('.signin-block >> button')
    // Ввод имени пользователя и пароля
    await page.fill('input[type="email"]', username);
    await page.fill('input[type="password"]', password);

    // Нажатие кнопки "Войти"
    await page.click('button[type="submit"]');

    // Ожидаем завершения запроса к API "/api/details"
    const response = await page.waitForResponse(response =>
        response.url().includes('/api/details') && response.status() === 200
    );

    // Логируем ответ (опционально) для отладки
    console.log('Response from /api/details:', await response.json());

    // Ожидание перенаправления на главную страницу после успешного логина
    await page.waitForURL('/my-gates');
}

// Функция для перехвата API-запроса и возврата данных
async function details(page) {
    await page.waitForLoadState('networkidle', { timeout: 60000 }); // Ждём, когда сетевые запросы завершатся

    const response = await page.waitForResponse(
        response => response.url().includes('/api/details') && response.status() === 200,
        { timeout: 30000 } // Тайм-аут для конкретного запроса
    );

    const responseBody = await response.json();
    return responseBody;
}

module.exports = { login, details };