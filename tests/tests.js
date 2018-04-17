const chai = require('chai');
const { describe, it } = require('mocha');
const mongoose = require('mongoose');

const assert = chai.assert;

const User = require('../server/model/user');
mongoose.connect('mongodb://localhost/messenger-test');

describe('User', function() {
    this.timeout(10000);
    before(async () => {
        await User.removeAll();
    });

    describe('Цикл создания и получения пользователя', () => {
        let user;
        // 22619508 это мой ID-шник :P
        const githubId = '22619508';
        const userName = 'Тестовый пользователь';
        const avatarPath = 'test2.jpg';
        it('Создание пользователя', async () => {
            user = await User.create(userName, githubId);
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
            const user = await User.findByGithubId('yakotik');
            assert.isNull(user);
        });
    });

    after(() => {
        mongoose.disconnect();
    });
});
