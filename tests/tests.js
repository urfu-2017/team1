const chai = require('chai');
const { describe, it, before, after } = require('mocha');
const mongoose = require('mongoose');

const { assert } = chai;

const User = require('../server/managers/user');
const Contact = require('../server/managers/contact');


mongoose.connect('mongodb://localhost/messenger-test');

describe('User', function () { // eslint-disable-line func-names
    this.timeout(10000);

    before(async () => {
        await User.removeAll();
        await Contact.removeAll();
    });

    const githubId = '22619508';
    const userName = 'Тестовый пользователь';
    const avatarPath = 'test2.jpg';

    describe('Тестирование пользователя', () => {
        let user;
        // 22619508 это мой ID-шник :P
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

        it('Добавление пользователя в контакты', async () => {
            const github2 = '22619509';
            const user2 = await User.create('Тестовый2', github2, avatarPath);
            user = await User.addContactToUser(user, user2);
            assert.lengthOf(user.contacts, 1);
            assert.equal(user.contacts[0].name, 'Тестовый2');
        });

        it('Добавление неуникального пользователя в контакты', async () => {
            const github2 = '22619509';
            const user2 = await User.findByGithubId(github2);
            user = await User.addContactToUser(user, user2);
            user = await User.addContactToUser(user, user2);
            user = await User.addContactToUser(user, user2);
            user = await User.addContactToUser(user, user2);
            assert.lengthOf(user.contacts, 1);
            assert.equal(user.contacts[0].name, 'Тестовый2');
        });
    });

    after(() => {
        mongoose.disconnect();
    });
});
