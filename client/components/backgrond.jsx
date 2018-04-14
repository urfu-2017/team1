import React, { Component } from 'react';
import PropTypes from 'prop-types';
import BackgroundWrapper from '../styles/backgrond';
import WeatherResponse from './weather/response';
import WeatherRequest from './weather/request';

export default class Background extends Component {
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

        return (
            <BackgroundWrapper id="background">
                <WeatherResponse weatherData={weatherData} />
                <WeatherRequest weatherData={weatherData} />
            </BackgroundWrapper>
        );
    }
}
