import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { ResponseWrapper, City, Date, Temperature, WindSpeed, Title, TempTitle, WindSpeedTitle }
    from '../../styles/weatheer/responseWeather';

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

        return (
            <ResponseWrapper>
                <Title>Прогноз погоды на 3 часа</Title>
                <City>{weatherData.name}</City>
                <Date>{weatherData.date}</Date>
                <TempTitle>Температура: </TempTitle>
                <Temperature>{weatherData.temperature} &#8451;</Temperature>
                <WindSpeedTitle>Скорость ветра: </WindSpeedTitle>
                <WindSpeed>{weatherData.windSpeed} <sup>м</sup>/<sub>с</sub></WindSpeed>
            </ResponseWrapper>
        );
    }
}
