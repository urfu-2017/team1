import styled from 'styled-components';

export const Wrapper = styled.main`
    height: 100%;
    max-width: 1260px;
    display: flex;
    margin: 0 auto;
    overflow: hidden;
    background: ${props => (props.isNightTheme ? '#212121' : '#fff')};
    color:  ${props => (props.isNightTheme ? '#EEE': '#000')};
`;