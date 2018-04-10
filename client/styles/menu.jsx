import styled from 'styled-components';

export const MenuRoot = styled.section`
    width: 25%;
    height: 100%;
    background: #f2f3dE;
    .profile {
        padding: 5px;
        display: flex;
        align-items: center;
    }
    .profile__name {
        margin-left: 15px;
    }
    .profile__avatar {
        width: 64px;
        height: 64px;
    }
    .contacts {
        padding: 20px 10px;
        cursor: default;
        &:hover {
           background: #b7c5f5;;
        }
    }
    
`;
