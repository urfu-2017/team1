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

export const ReactionParanja = styled.div`
    position: fixed;
    z-index: 10;
    @media screen and (max-width: 1248px) {
        left: 35%;
    }
    @media screen and (min-width: 1249px) {
        right: calc((100vw - 1220px) / 2);
        left: calc((100vw - 1248px) / 2 + 436px);
    }
    top: 58px;
    bottom: 0;
    background: rgba(0,0,0,.2);
`;
