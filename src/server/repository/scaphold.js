'use strict';

const { ApolloClient } = require('apollo-client');
const { HttpLink } = require('apollo-link-http');
const gql = require('graphql-tag');
const fetch = require('node-fetch');
const { createHttpLink } = require('apollo-link-http');
const { InMemoryCache } = require('apollo-cache-inmemory');

const { CREATE_USER_ql } = require('./graphqlQueries/createUser');
const getUserByGihubId = require('./graphqlQueries/getUserByGithubId');
const getUserByid =  require('./graphqlQueries/getUser');

class Scaphold {
    constructor(scapholdUri) {
        this.client = new ApolloClient({
            link: createHttpLink({ uri: scapholdUri, fetch: fetch }),
            cache: new InMemoryCache()
        });
    }

    async findUserByGithubID(githubId) {
        const user = await this.client.query({query: getUserByGihubId(githubId)})
            .then(data => {
                return data.data.viewer.allUsers.edges[0];
            }
            )
            .catch(error => console.error(error));

        if (!user) {
            return null;
        }
        return user.node;
    }

    async findUserByID(id) {
        const user = await this.client.query({query: getUserByid(id)})
            .then(data => {
                return data.data.getUser;
            }
            )
            .catch(error => console.error(error));

        return user;
    }

    async createUser(name, avatar, githubId) {
        const user = await this.client.mutate({
            mutation: CREATE_USER_ql,
            variables: {
                    user: {
                        username: name,
                        password: 'passowrd',
                        githubId: githubId,
                        avatar: avatar
                    }
                }
            
        })
            .then(data => {
                return data;
            })
            .catch(error => console.error(error));

        return user.data.createUser.changedUser;
    }
}

module.exports = Scaphold