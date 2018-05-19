import styled from 'styled-components';
import { withUiTheme } from '../lib/withUiTheme';

const ChatWindowWrapper = withUiTheme(styled.section`
    width: 64%;
    min-width: 500px;
    position: relative;
    display: flex;
    flex-direction: column;
    box-sizing: border-box;
    background: ${props => (props.uiTheme.isNightTheme ? '#212121' : '#fff')};
    border-right: 1.5px solid ${props => !props.uiTheme.isNightTheme ? 'lavender' : '#424242' };
`);

export default ChatWindowWrapper;
