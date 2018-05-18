// import {graphql, compose} from 'react-apollo';
// import {GetUiTheme, UpdateTheme} from '../graphql/localState';
//
//
// export default compose(
//     graphql(GetUiTheme.query, {
//         props: GetUiTheme.map
//     }),
//     graphql(UpdateTheme.mutation, {
//         props: UpdateTheme.map
//     })
// );


import React from 'react';


export const { Provider, Consumer } = React.createContext({});
export const withUiTheme = Decorated => {
    return (props) => (
        <Consumer>
            { (isNightTheme) =>
                <Decorated
                    {...props}
                    uiTheme={{ isNightTheme }}
                />
            }
        </Consumer>
    )
};
