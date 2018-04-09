
import styled from 'styled-components';

const ChatWindowWrapper = styled.section`
    width: 65%;
    display: flex;
    flex-direction: column;
    box-sizing: border-box;
    background: #e4e0dc;
    
    @media (max-width: 400px)
    {
        display: none;
    }
`;

export default ChatWindowWrapper;
