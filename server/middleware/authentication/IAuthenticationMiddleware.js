exports.cheUser = (req, res, next) => {
    //магия по аутентификации пользователя, проверка его секретных кук и т.д.(посмотреть возможные библиотеки)
    res.locals.isAutorize = true;
    next();
};