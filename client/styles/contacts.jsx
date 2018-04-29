import styled from 'styled-components';

export const ContactsWrapper = styled.article`
    width: 340px;
    height: 500px;
    top: 50%;
    left: 50%;
    position: absolute;
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    transform: translate(-50%, -50%);
    background: #f2f3dE;
    .header {
        padding: 0 0 0 20px;
        margin: 30px 0;
    }
`;
