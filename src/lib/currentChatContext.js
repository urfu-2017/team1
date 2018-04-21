import React from 'react';


export const { Provider, Consumer } = React.createContext({
    currentChatId: null,
    selectChat: id => {}
});
export const withCurrentChatId = Decorated => {
    return (props) => (
        <Consumer>
            {
                ({currentChatId, selectChat}) =>
                <Decorated {...props} currentChatId={currentChatId} selectChat={selectChat} />
            }
        </Consumer>
    )
};
