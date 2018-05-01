import styled from 'styled-components';

export const MenuRoot = styled.section`
    width: 300px;
    height: 100%;
    background: white;
    border-right: 1px solid #639eca;
    .profile {
        padding: 5px;
        display: flex;
        align-items: center;
        background: #639eca;
        color: white;
    }
    .profile__name {
        margin-left: 15px;
    }
    .profile__avatar {
        width: 64px;
        height: 64px;
        border-radius: 50%;
    }
    .menu__item
    {
        margin: 0;
        padding: 15px 0 15px 20px;
        cursor: default;
        &:hover {
           background: #639eca33;
        }
    }
    .contacts {
        &:before {
            margin-right: 20px;
            font-family: FontAwesome5;
            content: '\f0c0';
        }
    }
    .editProfile {
        &:before {
            margin-right: 20px;
            font-family: FontAwesome5;
            content: '\f044';
        }
    }
    .createChat {
        &:before {
            margin-right: 20px;
            font-family: FontAwesome5;
            content: '\f086';
        }
    }
`;
