'use strict';

const hruDb = require('../../../server/repository/hrudb-rest');


class HruRepository {
    constructor(credentials, retryTimes = 5) {
        this._credentials = credentials;
        this._retryTimes = retryTimes;

        this._cache = new Map();
    }

    async saveUser(user) {
        await this._save('user', user, user.id);
    }

    // временный метод, пока не решим, что делать
    async saveUserGithubId(githubId, user) {
        await this._save('githubId', user.id, githubId);
    }

    async saveChat(chat) {
        await this._save('chat', chat, chat.id);
    }

    async saveMessage(message, chatId) {
        await this._save('messages', message, chatId, hruDb.put, false);
    }

    // Непрочитанные сообщения -
    // те, что добавлены позже последнего прочтения определённого чата определённым пользователем
    async saveLastReadTime(userId, chatId, timestamp) {
        await this._save('lastRead', timestamp, `${userId}_${chatId}`);
    }

    async getUser(userId) {
        return await this._get('user', userId);
    }

    async getChat(chatId) {
        return await this._get('chat', chatId);
    }

    async getLastReadTime(userId, chatId) {
        return await this._get('lastRead', `${userId}_${chatId}`);
    }

    async getMessages(chatId, restrictions = null) {
        return await this._get(
            'messages', chatId,
            (creds, key) => hruDb.getAll(creds, key, restrictions), false
        );
    }

    async getUserIdByGithubId(githubId) {
        const userId = await this._get('githubId', githubId);
        return await this.getUser(userId);
    }

    /*
    Нужно дополнительно обсудить интерфейс
    В данной версии реализация потребует лавины http запросов
    При этом необходимость таких ограничений не очень ясна

    async getMessagesByRange(chatId, oldestMessageId, countMessages) {

    }


    async getChatsByRange(userId, oldestChatId, countChats) {

    }
    */

    async getAllUserChats(userId) {
        const user = await this.getUser(userId);
        const tasks = user.chatsIds
            .map(id => this.getChat(id));
        return await Promise.all(tasks);
    }

    async getAllChatUsers(chatId) {
        const chat = await this.getChat(chatId);
        const tasks = chat.usersIds
            .map(id => this.getUser(id));
        return await Promise.all(tasks);
    }

    async _save(prefix, obj, id, method = hruDb.post, cache = true) {
        const serialized = JSON.stringify(obj);
        const key = `${prefix}_${id}`;
        const outcome = await this._performRequest(
            () => method.call(null, this._credentials, key, serialized));
        if (cache && outcome !== null) {
            this._updateCache(key, obj);
        }
    }

    async _get(prefix, id, method = hruDb.get, cache = true) {
        const key = `${prefix}_${id}`;
        const cached = this._tryGetFromCache(key);
        if (cached !== undefined) {
            return cached;
        }

        const serialized = await this._performRequest(
            () => method.call(null, this._credentials, key));
        if (serialized === null) {
            return null;
        }
        const obj = JSON.parse(serialized);
        if (cache) {
            this._updateCache(key, obj);
        }
        return obj;
    }

    async _performRequest(request) {
        for (let i = 0; i < this._retryTimes; i += 1) {
            try {
                return await request();
            } catch(exc) {
            }
        }

        return null;
    }

    _tryGetFromCache(key) {
        return this._cache.get(key);
    }

    _updateCache(key, value) {
        this._cache.set(key, value);
    }
}
