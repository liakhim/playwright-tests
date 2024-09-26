async function login(page, username, password) {
    // Переход на страницу логина
    // await page.goto('/login');
    await page.click('div.burger')
    await page.click('.signin-block button')
    // Ввод имени пользователя и пароля
    await page.fill('input[type="email"]', username);
    await page.fill('input[type="password"]', password);

    // Нажатие кнопки "Войти"
    await page.click('button[type="submit"]');

    // Ожидание перенаправления на главную страницу после успешного логина
    await page.waitForURL('/my-gates');
}

// Функция для перехвата API-запроса и возврата данных
async function details(page) {
    // Ожидаем конкретный API запрос и получаем его ответ
    const response = await page.waitForResponse(response => {
            console.log(response.status())
            return response.url().includes('/api/details') && response.status() === 200
        }
    );

    // Получаем тело ответа
    const responseBody = await response.json();

    return responseBody;
}

module.exports = { login, details };