import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { RequestWrapper } from '../../styles/weatheer/requestWrapper';

export default class WeatherResponse extends Component {
    static propTypes = {
        weatherData: PropTypes.object
    };

    static defaultProps = { weatherData: {} };

    constructor(props) {
        super(props);
        this.state = {};
    }
    render() {
        const { weatherData } = this.props;

        return <RequestWrapper>{weatherData.name}</RequestWrapper>;
    }
}
