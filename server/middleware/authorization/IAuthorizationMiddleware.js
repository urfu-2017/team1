'use strict';

exports.setUser = (req, res, next) => {
    if (!res.locals.isAutorize) {
        // магия по авторизации
    }

    next();
};
