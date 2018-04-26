const UserManager = require('../server/managers/user');

require('dotenv').config();

const mongoose = require('mongoose');

(async () => {
    await mongoose.connect(`mongodb://${process.env.MONGO_HOST}/${process.env.MONGO_DB}?authSource=admin`, {
        auth: {
            user: process.env.MONGO_USER,
            password: process.env.MONGO_PASSWORD
        }
    });

    await mongoose.connection.db.dropDatabase();

    const user = await UserManager.create('Анастасия Бабушкина', '22619508');
    const user2 = await UserManager.create('Тестов тестович', '22619509');
    const user3 = await UserManager.create('Тестов тестоввиич', '22619510');
    const user4 = await UserManager.create('Ни у кого нету его', '22619511'); // eslint-disable-line 
    await UserManager.addContactToUser(user, user2);
    await UserManager.addContactToUser(user, user3);

    await mongoose.disconnect();
})();
