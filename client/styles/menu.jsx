import styled from 'styled-components';

export const MenuRoot = styled.section`
    width: 300px;
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
    .menu__item
    {
        margin: 0;
        padding: 15px 0 15px 20px;
        cursor: default;
        &:hover {
           background: #b7c5f5;;
        }
    }
    
`;
