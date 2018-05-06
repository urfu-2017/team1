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
    left: 0;
    right: 0;
    top: 0;
    margin: 0 auto;
    z-index: 1500;
    background: rgba(0,0,0,.2);
    max-width: 1260px;
    height: 100vh;
`;
