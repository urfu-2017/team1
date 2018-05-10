// import {graphql, compose} from 'react-apollo';
// import {GetUiTheme, UpdateTheme} from '../graphqlQueries/localState';
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
            { ({isNightTheme, toggleUiTheme}) => 
                <Decorated 
                    {...props} 
                    toggleUiTheme={toggleUiTheme} 
                    uiTheme={{ isNightTheme }} 
                />
            }
        </Consumer>
    )
};