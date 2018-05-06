import styled from 'styled-components';

export const MenuRoot = styled.section`
    width: 300px;
    height: 100%;
    .profile {
        background: #5682a3;
        padding: 5px;
        display: flex;
        align-items: center;
    }
    .profile__name {
        color: #fff;
        margin-left: 15px;
    }
    .profile__avatar {
        border-radius: 5px;
        width: 64px;
        height: 64px;
    }
    .menu__item
    {
        background: lavender;
        margin: 0;
        padding: 15px 0 15px 20px;
        cursor: default;
        &:hover {
           background: #b7c5f5;
        }
    }
    
`;
