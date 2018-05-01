import styled from 'styled-components';

export const ChangedInputWrapper = styled.div`
    .changed-input-label__label {
        cursor: pointer;
    }
    .changed-input-label__label::after {
        font-family: FontAwesome5;
        cursor: pointer;
        content: '\f303';
        padding-left: 5px;
        color: #649eca;
        font-size: 10px;
        font-weight: 900;
    }
`;