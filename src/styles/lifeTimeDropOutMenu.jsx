import styled from 'styled-components';
import { withUiTheme } from '../lib/withUiTheme';

export const DropOutMenuWrapper = withUiTheme(styled.section`
    div {
        width: 30px !important;
        padding: 0px !important;
        line-height: 60px !important;
    }

    div div button {
        display: none !important;
    }

    div div button ~ div {
        display: none !important;
    }

    div div div svg {
        width: 20px !important;
        height: 20px !important;
        padding-top: 19px !important;
    }
`);
