exports.setUser = (req, res, next) => {
    if (!res.locals.isAutorize) 
    {
        //магия по авторизации пользователя, выдача ему секретных кук и т.д.(посмотреть возможные библиотеки)
    }

    next();
};