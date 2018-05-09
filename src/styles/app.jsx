import styled from 'styled-components';
import { withUiTheme } from '../lib/withUiTheme';

export const Wrapper = withUiTheme(styled.main`
    height: 100%;
    max-width: 1260px;
    display: flex;
    margin: 0 auto;
    overflow: hidden;
    background: ${props => (props.uiTheme.isNightTheme ? '#212121' : '#fff')};
    color:  ${props => (props.uiTheme.isNightTheme ? '#EEE': '#000')};
`);
