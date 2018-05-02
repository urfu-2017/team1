import styled from 'styled-components';

export const SelectContactListWrapper = styled.div`
    .selected-contact {
        align-items: center;
        cursor: pointer;
        margin 0;
        padding: 8px;
    }
    .selected-contact.active {
        background-color: #639eca33;
    }
    .selected-contact__name {
        min-width: 700px;
    }
    .selected-contact__active::before {
        font-family: FontAwesome5;
        font-weight: 900;
        content: '\f00c';
    }
`;
