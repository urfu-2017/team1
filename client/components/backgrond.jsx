import React, { Component } from 'react';
import PropTypes from 'prop-types';
import BackgroundWrapper from '../styles/backgrond';

export default class Background extends Component {
    static propTypes = {
        background: PropTypes.string
    };

    static defaultProps = { background: '' };

    constructor(props) {
        super(props);
        this.state = {};
    }
    render() {
        return <BackgroundWrapper id="background" />;
    }
}
