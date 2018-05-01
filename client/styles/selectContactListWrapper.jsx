import styled from 'styled-components';

export const SelectContactListWrapper = styled.div`
    .selected-contact {
        align-items: center;
        cursor: pointer;
    }
    .selected-contact__name {
        min-width: 600px;
    }
    .selected-contact__active::before {
        font-family: FontAwesome5;
        font-weight: 400;
        content: '\f058';
    }
    .selected-contact__inactive::before {
        font-family: FontAwesome5;
        font-weight: 400;
        content: '\f111';
    }
`;
