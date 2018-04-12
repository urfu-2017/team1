'use strict';

const hruDb = require('../lib/hru-requester/hrudb-rest');


class HruRepository {
    constructor(credentials, retryTimes = 8, disableCache = false) {
        this._credentials = credentials;
        this._retryTimes = retryTimes;

        this._cache = new Map();
        this._disableCache = disableCache;
    }

    async updateUser(user) {
        return await this._save('user', user, user.id);
    }

    async saveUser(user) {
        // TODO: possible vulnerability
        const usersIndexEntry = `${user.name}_${user.id}`;
        const updateTask = this.updateUser(user);
        await Promise.all([
            updateTask,
            this.saveUserGithubId(user.githubId, user.id),
            this._save('usersIndex', usersIndexEntry, '', hruDb.post, false)
        ]);
        return await updateTask;
    }

    // TODO: refactor
    async saveUserGithubId(githubId, userId) {
        return await this._save('githubId', userId, githubId);
    }

    async updateChat(chat) {
        return await this._save('chat', chat, chat.id);
    }

    // TODO: refactor
    async saveChat(chat) {
        // TODO: possible vulnerability
        const chatsIndexEntry = `${chat.title}_${chat.id}`;
        const updateTask = this.updateChat(chat);
        await Promise.all([
            updateTask,
            this._save('chatsIndex', chatsIndexEntry, '', hruDb.post, false)
        ]);
        return await updateTask;
    }

    async saveMessage(message, chatId) {
        return await this._save('messages', message, chatId, hruDb.post, false);
    }

    async saveLastReadTime(userId, chatId, timestamp) {
        return await this._save('lastRead', timestamp, `${userId}_${chatId}`);
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

    async getMessages(chatId, { sort = 'date', from = null, to = null, limit = null, offset = null }) {
        const restrictions = {
            from,
            to,
            limit,
            offset,
            sort
        };
        const serializedMessages = await this._get(
            'messages', chatId,
            (creds, key) => hruDb.getAll(creds, key, restrictions),
            false
        );
        return serializedMessages.map(JSON.parse);
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
        const from = await this.getLastReadTime(userId, chatId);
        return await this.getMessages(chatId, { from });
    }

    // sort: 'date' | 'alph'
    async getAllUsers({ sort = 'date', from = null, to = null, limit = null, offset = null }) {
        const restrictions = {
            from,
            to,
            limit,
            offset,
            sort
        };
        const users = await this._get(
            'usersIndex', '',
            (creds, key) => hruDb.getAll(creds, key, restrictions), false
        );
        // taking cd_ef from ab_cd_ef:
        const usersIds = users.map(JSON.parse)
            .map(u => u.split(/_(.+)/)[1]);
        const tasks = usersIds.map(id => this.getUser(id));
        return await Promise.all(tasks);
    }

    // TODO: refactor
    async getAllChats({ sort = 'date', from = null, to = null, limit = null, offset = null }) {
        const restrictions = {
            from,
            to,
            limit,
            offset,
            sort
        };
        const chats = await this._get(
            'chatsIndex', '',
            (creds, key) => hruDb.getAll(creds, key, restrictions), false
        );
        // taking cd_ef from ab_cd_ef:
        const chatsIds = chats.map(JSON.parse)
            .map(c => c.split(/_(.+)/)[1]);
        const tasks = chatsIds.map(id => this.getChat(id));
        return await Promise.all(tasks);
    }

    async getUserContacts(userId) {
        const user = await this.getUser(userId);
        if (user === null) {
            return null;
        }

        const tasks = user.contactsIds.map(contactId => this.getUser(contactId));
        return await Promise.all(tasks);
    }

    async _save(prefix, obj, id, method = hruDb.put, cache = true) {
        const serialized = JSON.stringify(obj);
        const key = `${prefix}_${id}`;
        const outcome = await this._performRequest(() => method.call(null, this._credentials, key, serialized));
        if (cache && outcome !== null) {
            this._updateCache(key, obj);
        }
        return outcome;
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

    async _performRequest(request) {
        for (let i = 0; i < this._retryTimes; i += 1) {
            try {
                return await request();
            } catch (error) {
                if (error.statusCode >= 500) {
                    console.error(`Can't make a request, reason: ${error}`);
                }
            }
        }

        return null;
    }

    _tryGetFromCache(key) {
        if (this._disableCache) {
            return undefined;
        }
        const value = this._cache.get(key);
        if (typeof value === 'object') {
            return { ...value };
        }
        return value;
    }

    _updateCache(key, value) {
        if (this._disableCache) {
            return;
        }
        if (typeof value === 'object') {
            value = { ...value };
        }
        this._cache.set(key, value);
    }
}


module.exports = HruRepository;
