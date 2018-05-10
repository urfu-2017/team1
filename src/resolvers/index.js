import {GetLocalState} from '../graphqlQueries/localState';


const mutation = (fieldName, variableName) => (_, variables, { cache }) => {
    const currentState = cache.readQuery({
        query: GetLocalState.query
    });
    const newState = {
        localState: {
            ...currentState.localState
        }
    };
    newState.localState[fieldName] = variables[variableName];
    cache.writeData({ data: newState });
    return newState;
};


export default {
    Mutation: {
        updateCurrentChatId: mutation('currentChatId', 'id'),
        updateTheme: (_, { isNightTheme }, { cache }) => {
            const data = {
                uiTheme: {
                    isNightTheme,
                    __typename: 'UiTheme'
                }
            };
            cache.writeData({ data });
            return data;
        }
    }
};
