import styled from 'styled-components';

export const MessagesList = styled.section`
    width: 100%;
    overflow-y: scroll;
    display: flex;
    flex: 1;
    flex-direction: column;
    background-color: #ffffff;
`;

export const Header = styled.section`
    height: 45px;
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: rgba(255,255,255, .7);
`;

export const Button = styled.input`
    backgroundColor: white;
    position: absolute;
    padding: 0;
    marginRight: 128px;
    marginBottom: 10px;
    bottom: 50px;
    width: 30px;
    height: 30px;
    border-radius: 50%;
    borderColor: #b7c5f5;
    color: #b7c5f5;
    right: 30px;
    cursor: pointer;
`;

