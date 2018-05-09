import styled from 'styled-components';
import { withUiTheme } from '../lib/withUiTheme';

export const Reactions = styled.div`
    flex-wrap: wrap;
    padding: 2px 5px;
    display: flex;
`;

export const ReactionWrapper = withUiTheme(styled.div`
    display: flex;
    flexWrap: wrap;
    .reaction {
        display: flex;
        align-items: center;
        cursor: pointer;
        
        margin: 0 1px;
        padding: 2px 4px;
        border: 1px solid  ${props => props.uiTheme.isNightTheme ? '#CFD8DC' : '#000'};    
        border-radius: 4px;
        -webkit-border-radius: 4px;
        -moz-border-radius: 4px;
    }
    .reaction.reaction-current {
        border-color: #5682a3;
    }
    .reaction .reaction__emoji {
        margin-right: 2px;
    }
`);
