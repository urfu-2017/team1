import styled from 'styled-components';

export const MessagesList = styled.section`
    width: 100%;
    display: flex;
    flex-direction: column;
`;

export const Header = styled.section`
    height: 65px !important;
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    color: #fff;
    background-color: #5682a3;
`;

export const ScrollButton = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: white;
    position: fixed;
    padding: 0;
    margin-bottom: 10px;
    bottom: 50px;
    width: 30px;
    height: 30px;
    border: 2px solid #b7c5f5;
    border-radius: 50%;
    color: #b7c5f5;
    left: 92%;
    cursor: pointer;
    &::before {
<<<<<<< 9d149547b4c263f631a4194cfee60ca22e153afd
        content: '▼';
        font-weight: 900;
        font-size: 20px;
=======
        font-family: FontAwesome5;
        content: '\f107';
        font-weight: 900;
        position: absolute;
        top: 4px;
        left: 7px;
        font-size: 24px;
>>>>>>> add styles
    }
`;
