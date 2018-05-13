import styled from 'styled-components';
import { withUiTheme } from '../lib/withUiTheme';

export const SearchResults = withUiTheme(styled.div`
    .messagePreview {
        overflow: hidden;
        text-overflow: ellipsis;
    }
    .messagePreview__sender {
        color: #39a7fe;
        font-style: italic;
    }
    .messagePreview__text {
        color: ${props => props.uiTheme.isNightTheme ? '#ccc' : '#555'}
    }
    .messagePreview__createdAt {
        font-size: 10px;
        float: right;
    }
`);
