import styled from 'styled-components';

export const GroupChatCreateWrapper = styled.div`
    width: 340px;
    height: 350px;
    top: 50%;
    left: 50%;
    position: absolute;
    display: flex;
    align-items: center;
    flex-direction: column;
    justify-content: space-around;
    transform: translate(-50%, -50%);
    background: #f2f3dE;
    .header {
        padding: 0 30px;
    }
    .buttons {
        width: 100%;
        height: 40px;
        display: flex;
        justify-content: space-around
        align-items: center;
    }
`;
