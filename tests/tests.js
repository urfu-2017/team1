const chai = require('chai');
const { describe, it } = require('mocha');

const assert = chai.assert;

const User = require('../server/model/user');

describe('User', () => {
    describe('Цикл создания и получения пользователя', () => {
        let user;
        // 22619508 это мой ID-шник :P
        const githubID = '22619508';
        const userName = 'Тестовый пользователь';
        const avatarPath = 'test2.jpg';
        it('Создание пользователя', async () => {
            user = await User.create(userName, avatarPath);
            assert.instanceOf(user, User);
        });
        it('Получение пользователя', async () => {
            user = await User.findByID(user.id);
            assert.instanceOf(user, User);
            assert.equal(user.name, userName);
            assert.equal(user.avatar, avatarPath);
        });
        it('Получение не существуюшего пользователя', async () => {
            const missingUser = await User.findByID('Deadline blizko');
            assert.isNull(missingUser);
        });
        it('Добавление githubid к пользователю', async () => {
            await user.addGithubID(githubID);
        });
        it('Поиск по githubid должен возвращать пользователя "Тестовый пользователь"', async () => {
            const githubUser = await User.findByGithubID(githubID);
            assert.instanceOf(user, User);
            assert.equal(user.id, githubUser.id);
            assert.equal(user.name, githubUser.name);
            assert.equal(user.avatar, githubUser.avatar);
        });
        it('Поиск по githubid по несуществующему юзеру', async () => {
            const user = await User.findByGithubID('yakotik');
            assert.isNull(user);
        }).timeout(10000);
    });
});