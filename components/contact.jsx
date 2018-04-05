import React from 'react';
import PropTypes from 'prop-types';

import styled from 'styled-components';

const ContactWrraper = styled.article`
    height: 40px;
    width: 90%;
    display: flex;
    align-self: center;
    align-items: center;
    border: 1px solid #ccc;
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
