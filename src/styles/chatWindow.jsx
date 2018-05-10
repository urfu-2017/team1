import styled from 'styled-components';
import { withUiTheme } from '../lib/withUiTheme';

const ChatWindowWrapper = withUiTheme(styled.section`
    width: 65%;
    min-width: 300px;
    position: relative;
    display: flex;
    flex-direction: column;
    box-sizing: border-box;
    background: ${props => (props.uiTheme.isNightTheme ? '#212121;' : '#fff')};
`);

export default ChatWindowWrapper;
