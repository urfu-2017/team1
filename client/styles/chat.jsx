
import styled from 'styled-components';

const ChatWrapper = styled.section`
    width: 65%;
    display: flex;
    flex-direction: column;
    box-sizing: border-box;
    background: #f2f3ee;
    
    @media (max-width: 400px)
    {
        display: none;
    }
`;

export default ChatWrapper;
