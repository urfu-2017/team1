import styled from 'styled-components';
import { withUiTheme } from '../lib/withUiTheme';

export const getTheme = isNightTheme => ({
    fontFamily: 'Roboto Condensed',
    palette: {
        primary1Color: !isNightTheme ? '#5682a3' : '#37474F',
        primary2Color: !isNightTheme ? '#5682a3' : '#37474F',
        textColor: isNightTheme ? '#fff' : '#000',
        canvasColor: isNightTheme ? '#000' : '#fff',
    },
    appBar: {
        'min-height': '59px',
        'max-height': '59px'
    },
    snackbar: {
        backgroundColor: !isNightTheme ? '#5682a3' : '#37474F',
        textColor: '#fff'
    }
});

export const Wrapper = withUiTheme(styled.main`
    height: 100%;
    max-width: 1260px;
    display: flex;
    margin: 0 auto;
    overflow: hidden;
    background: ${props => (props.uiTheme.isNightTheme ? '#212121' : '#fff')};
    color:  ${props => (props.uiTheme.isNightTheme ? '#EEE': '#000')};
`);
