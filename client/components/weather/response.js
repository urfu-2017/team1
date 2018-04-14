import React, { Component } from 'react';
import PropTypes from 'prop-types';

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
        console.log('getWeatherData');
        console.log(weatherData);

        return (
            <div />
        );
    }
}
