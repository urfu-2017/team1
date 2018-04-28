import React from 'react';
import TimePicker from 'material-ui/TimePicker';
import DatePicker from 'material-ui/DatePicker';
import RaisedButton from 'material-ui/RaisedButton';
import IntlPolyfill from 'intl';
import areIntlLocalesSupported from 'intl-locales-supported';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import AlarmClockWrapper from '../styles/alarmClock';

export default class AlarmClock extends React.Component {
    constructor(props) {
        super(props);

        const minDate = new Date();
        minDate.setFullYear(minDate.getFullYear() - 1);
        minDate.setHours(0, 0, 0, 0);
        this.state = { minDate };
    }

    disableDates = date => date < this.state.minDate;

    render() {
        let DateTimeFormat;
        if (areIntlLocalesSupported(['ru', 'ru-RU'])) {
            DateTimeFormat = global.Intl.DateTimeFormat;
        } else {
            DateTimeFormat = IntlPolyfill.DateTimeFormat;
            require('intl/locale-data/jsonp/ru');
            require('intl/locale-data/jsonp/ru-RU');
        }
        return (
            <MuiThemeProvider>
                <AlarmClockWrapper>
                    <h1>Настройка будильника</h1>
                    <DatePicker
                        locale="ru"
                        okLabel="Ок"
                        cancelLabel="Закрыть"
                        floatingLabelText="Выберите дату"
                        DateTimeFormat={DateTimeFormat}
                        shouldDisableDate={this.disableDates}
                        defaultDate={this.state.minDate}
                    />
                    <TimePicker
                        okLabel="Ок"
                        cancelLabel="Закрыть"
                        floatingLabelText="Выберите время"
                        format="24hr"
                        hintText="24hr Format"
                    />
                    <RaisedButton label="ВКЛ" />
                    <RaisedButton label="ВЫКЛ" />
                </AlarmClockWrapper>
            </MuiThemeProvider>
        );
    }
}
