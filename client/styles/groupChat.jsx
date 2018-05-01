import styled from 'styled-components';

export const GroupChatWrapper = styled.div`
    width: 800px;
    .group-chat-header {
        justify-content: space-between;
    }
    .group-chat-header__button {
        cursor: pointer;
        display: flex;
        align-items: center;
        padding: 0 15px;
    }
    .group-chat__input {
        margin-left: 15px;
        font-size: 14px;
        margin-bottom: 10px;
        width: 600px;
    }
    .button--left::before {
        font-family: FontAwesome5;
        font-weight: 900;
        content: '\f053';
        padding-right: 5px;
    }
    .button--right::after {
        font-family: FontAwesome5;
        font-weight: 900;
        content: '\f054';
        padding-left: 5px;
    }
    .done--right::after {
        font-family: FontAwesome5;
        font-weight: 900;
        content: '\f00c';
        padding-left: 5px;
    }
`;

