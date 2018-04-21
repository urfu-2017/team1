import React from 'react';


export const { Provider, Consumer } = React.createContext({});
export const withCurrentUser = Decorated => {
    return (props) => (
        <Consumer>
            { currentUser => <Decorated {...props} currentUser={currentUser} />}
        </Consumer>
    )
}
