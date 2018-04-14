import styled from 'styled-components';

export const ResponseWrapper = styled.section`
    position: absolute;
    bottom: 20px;
    left: 20px;
    width: 240px;
    height: 190px;
    padding: 15px
    background: #fff;
    border-radius: 8px;
    display: grid;
    grid-gap: 10px;
    grid-template-areas: 't t'
    'c c'
    'd d'
    'd_temp temp'
    'd_ws ws';

    grid-template-rows: 1fr 1fr 1fr 1fr 1fr;
    grid-template-columns: 1fr .3fr;
    /*
    t - title
    c - city
    d - date
    temp - temperature
    ws - wind speed
     */
`;

export const TempTitle = styled.span`
    grid-area: d_temp;
    font-size: 20px;
    font-weight: 600;
`;

export const WindSpeedTitle = styled.span`
    grid-area: d_ws;
    font-size: 20px;
    font-weight: 600;
`;

export const Title = styled.span`
    grid-area: t;
    text-align: center;
    font-size: 24px;
    font-weight: 700;
`;

export const City = styled.div`
    grid-area: c;
    font-size: 20px;
    font-weight: 600;
`;

export const Date = styled.div`
    grid-area: d;
    font-size: 20px;
    font-weight: 600;
`;

export const Temperature = styled.div`
    grid-area: temp;
`;

export const WindSpeed = styled.div`
    grid-area: ws;
`;
