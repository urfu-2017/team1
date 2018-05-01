import styled from 'styled-components';

export const Reactions = styled.div`
    padding: 2px 5px;
    display: flex;
`;

export const ReactionWrapper = styled.div`
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
        border-color: #639eca;
        background: white;
    }
    .reaction .reaction__emoji {
        margin-right: 2px;
    }
`;
