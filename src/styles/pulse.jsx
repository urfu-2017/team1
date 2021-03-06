import styled, { keyframes } from 'styled-components';

export const pulse = keyframes`
    0%{
        transform: scale(1);
    }

    30%{
        transform: scale(1.3);
    }

    60%{
        transform: scale(1.1);
    }
    80%{
        transform: scale(1);
    }
    100%{
        transform: scale(.9);
    }
`