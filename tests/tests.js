const chai = require('chai');
const { describe, it, before, after } = require('mocha');
const mongoose = require('mongoose');

const { assert } = chai;

const User = require('../server/managers/user');
const { Contact } = require('../server/schemas/contact');
const { Chat } = require('../server/schemas/chat');
// const { Message } = require('../server/schemas/message');

mongoose.connect('mongodb://localhost/messenger-test');

describe('Тесты мессенджера', function () { // eslint-disable-line func-names
    this.timeout(10000);

    before(async () => {
        await Contact.remove();
        await Chat.remove();
        // await Message.remove();
        await User.removeAll();
    });
    // 22619508 это мой ID-шник :P
    const githubId = '22619508';
    // const githubId2 = '22619509';

    describe('Цикл создания и получения пользователя', () => {
        let user;
        const userName = 'Тестовый пользователь';
        const avatarPath = 'test2.jpg';
        it('Создание пользователя', async () => {
            user = await User.create(userName, githubId, avatarPath);
            assert.equal(user.name, userName);
        });
        it('Получение пользователя', async () => {
            user = await User.findById(user.id);
            assert.equal(user.name, userName);
            assert.equal(user.githubId, githubId);
        });
        it('Получение не существуюшего пользователя', async () => {
            const missingUser = await User.findById(mongoose.Schema.ObjectId('5ad6297fbc952b027022173r'));
            assert.isNull(missingUser);
        });
        it('Поиск по githubid должен возвращать пользователя "Тестовый пользователь"', async () => {
            const githubUser = await User.findByGithubId(githubId);
            assert.equal(user.id, githubUser.id);
            assert.equal(user.name, githubUser.name);
        });
        it('Поиск по githubid по несуществующему юзеру', async () => {
            const missingUser = await User.findByGithubId('yakotik');
            assert.isNull(missingUser);
        });
    });

    // describe('Добавления пользователя в контакты', async () => {
    // let user = await User.findById({ githubId });
    // });

    after(() => {
        mongoose.disconnect();
    });
});
