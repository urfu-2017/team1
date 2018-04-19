import React from 'react';
import styled from 'styled-components';

import createNextPage from '../lib/createNextPage';
import ChatWindow from '../components/chatWindow';
import SideBar from '../components/sidebar';


const Wrapper = styled.main`
    height: 100%;
    max-width: 1260px;
    display: flex;
    margin: 0 auto;
    overflow: hidden;
`;


export default class KilogrammApp extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    static async getInitialProps({ req }) {
        return {
            initState: req.state
        };
    }

    // TODO: there is probably a better solution
    layout = () => (
        <Wrapper>
            <SideBar />
            <ChatWindow />
        </Wrapper>
    );

    render() {
        return createNextPage(this.layout, this.props.initState);
    }
}
