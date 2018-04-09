'use strict';

const hruDb = require('./hru-requester/hrudb-rest');


class HruRepository {
    constructor(credentials, retryTimes = 5) {
        this._credentials = credentials;
        this._retryTimes = retryTimes;

        this._cache = new Map();
    }

    async saveUser(user) {
        return await this._save('user', user, user.id, hruDb.post);
    }

    async updateUser(user) {
        return await this._save('user', user, user.id);
    }

    async saveUserGithubId(githubId, user) {
        return await this._save('githubId', user.id, githubId);
    }

    async saveChat(chat) {
        await this._save('chat', chat, chat.id);
    }

    async saveMessage(message, chatId) {
        await this._save('messages', message, chatId, hruDb.post, false);
    }

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

    async getMessages(chatId, fromTimestamp = null, toTimestamp = null, limit = null) {
        const restrictions = HruRepository.getRestrictionsObject(fromTimestamp, toTimestamp, limit);
        return await this._get(
            'messages', chatId,
            (creds, key) => hruDb.getAll(creds, key, restrictions), false
        );
    }

    async getUserIdByServiceId(serviceUserId, serviceName = 'github') {
        return await this._get(`${serviceName}Id`, serviceUserId);
    }

    async getUserByGithubId(githubId) {
        const userId = await this.getUserIdByServiceId(githubId);
        if (userId === null) {
            return null;
        }
        return await this.getUser(userId);
    }

    async getUserChats(userId) {
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

    async getUnreadMessages(userId, chatId) {
        const fromTimestamp = await this.getLastReadTime(userId, chatId);
        return await this.getMessages(chatId, { fromTimestamp });
    }

    async _save(prefix, obj, id, method = hruDb.put, cache = true) {
        const serialized = JSON.stringify(obj);
        const key = `${prefix}_${id}`;
        const outcome = await this._performRequest(() => method.call(null, this._credentials, key, serialized));
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

        const serialized = await this._performRequest(() => method.call(null, this._credentials, key));
        if (serialized === null) {
            return null;
        }
        const obj = JSON.parse(serialized);
        if (cache) {
            this._updateCache(key, obj);
        }
        return obj;
    }

    static getRestrictionsObject(from, to, limit) {
        const restrictions = { from, to, limit };
        return Object.entries(restrictions)
            .filter(([_, val]) => val !== null)
            .reduce((acc, [k, v]) => {
                acc[k] = v;
                return acc;
            }, {});
    }

    async _performRequest(request) {
        for (let i = 0; i < this._retryTimes; i += 1) {
            try {
                return await request();
            } catch (exc) {
                if (exc.statusCode >= 500) {
                    console.error(`Can't make a request, reason: ${exc}`);
                }
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


module.exports = HruRepository;
