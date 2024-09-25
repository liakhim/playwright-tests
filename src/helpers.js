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

module.exports = { login };