import styled from 'styled-components';

export const muiTheme = getMuiTheme({
    fontFamily: 'Roboto Condensed',
    appBar: {
        height: 65
    }
});

export const Wrapper = styled.main`
    height: 100%;
    max-width: 1260px;
    display: flex;
    margin: 0 auto;
    overflow: hidden;
`;