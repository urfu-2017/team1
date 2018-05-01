import styled from 'styled-components';

export const GroupChatWrapper = styled.div`
    width: 900px;
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
        border-radius: 4px 4px;
        margin: 15px;
        font-size: 15px;
        margin-bottom: 10px;
        width: 300px;
        padding: 5px;
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

