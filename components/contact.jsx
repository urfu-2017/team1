import React from 'react';
import PropTypes from 'prop-types';

import styled from 'styled-components';

const ContactWrraper = styled.article`
    height: 40px;
    width: 100%;
    display: flex;
    align-self: center;
    align-items: center;
    background-color: ${props => (props.select ? '#b7c5f5' : '#fff')};
`;
export default class Contact extends React.Component {
    static propTypes = {
        name: PropTypes.string,
        onClick: PropTypes.func
    }

    static defaultProps = { name: '', onClick: {} };

    constructor(props) {
        super(props);
        this.state = {};
    }
    render() {
        const { name, onClick } = this.props;
        return (
            <ContactWrraper onClick={onClick}>
                <p>{ name }</p>
            </ContactWrraper>
        );
    }
}