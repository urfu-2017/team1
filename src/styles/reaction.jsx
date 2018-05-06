import styled from 'styled-components';

export const Reactions = styled.div`
    flex-wrap: wrap;
    padding: 2px 5px;
    display: flex;
`;

export const ReactionWrapper = styled.div`
    display: flex;
    flexWrap: wrap;
    .reaction {
        display: flex;
        align-items: center;
        cursor: pointer;
    
        margin: 0 1px;
        padding: 2px 4px;
        border: 1px solid #000000;    
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
`;

export const ReactionParanja = styled.div`
    position: fixed;
    @media screen and (max-width: 1260px) {
        right: 0;
        left: 35%;
    }
    @media screen and (min-width: 1261px) {
        right: calc((100vw - 1260px) / 2);
        left: calc((100vw - 1260px) / 2 + 441px);
    }
    top: 58px;
    bottom: 0;
    z-index: 1500;
    background: rgba(0,0,0,.2);
`;
