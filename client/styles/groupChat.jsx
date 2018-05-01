import styled from 'styled-components';

export const GroupChatCreateWrapper = styled.div`
    .group-chat-create-header {
        justify-content: space-between;
    }
    .group-chat-create-header__button {
        cursor: pointer;
        display: flex;
        align-items: center;
        padding: 0 15px;
    }
    .group-chat-create__input {
        margin-left: 15px;
        font-size: 14px;
        margin-bottom: 10px;
        width: 700px;
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
`;
