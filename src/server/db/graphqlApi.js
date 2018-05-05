'use strict';

const { ApolloClient } = require('apollo-client');
const { HttpLink } = require('apollo-link-http');
const fetch = require('node-fetch');
const { InMemoryCache } = require('apollo-cache-inmemory');

const { CREATE_USER_ql } = require('./graphqlQueries/createUser');
const AddUserToChat = require('./graphqlQueries/addUserToChat');
const getUserByGihubId = require('./graphqlQueries/getUserByGithubId');
const getUserByid = require('./graphqlQueries/getUser');


class GraphqlApi {
    constructor(uri) {
        this.client = new ApolloClient({
            link: new HttpLink({ uri, fetch: fetch }),
            cache: new InMemoryCache()
        });
    }

    async findUserByGithubID(githubId) {
        githubId = parseInt(githubId, 10);
        const user = await this.client.query({
            query: getUserByGihubId,
            variables: { githubId }
        });

        if (!user) {
            return null;
        }
        return user.data.User;
    }

    async findUserByID(id) {
        const user = await this.client.query({
            query: getUserByid,
            variables: { id }
        })
            .then(data => {
                    return data.data.User;
                }
            );

        return user;
    }

    async createUser(name, avatar, githubId) {
        githubId = parseInt(githubId, 10);
        const user = await this.client.mutate({
            mutation: CREATE_USER_ql,
            variables: {
                name: name,
                githubId: githubId,
                avatarUrl: avatar
            }

        });

        // // TODO: remove
        // const userId = user.data.createUser.id;
        // const chatId1 = 'cjgaqh7iqyrty0138157c5e2g';
        // const chatId2 = 'cjgaq285jyx2n0162k41m5d77';
        // this.client.mutate({
        //     mutation: AddUserToChat,
        //     variables: {
        //         userId,
        //         chatId: chatId1
        //     }
        // });
        // this.client.mutate({
        //     mutation: AddUserToChat,
        //     variables: {
        //         userId,
        //         chatId: chatId2
        //     }
        // });

        return user.data.createUser;
    }

    async addUserToChat(userId, chatId) {
        await this.client.mutate({
            mutation: AddUserToChat,
            variables: { userId, chatId }
        });
    }
}

module.exports = GraphqlApi;
