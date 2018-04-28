import React from 'react';
import TimePicker from 'material-ui/TimePicker';
import DatePicker from 'material-ui/DatePicker';
import RaisedButton from 'material-ui/RaisedButton';
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
    handleChangeMinDate = (event, date) => {
        if (date > this.minDate) {
            this.setState({ minDate: date });
        }
    };

    render() {
        return (
            <MuiThemeProvider>
                <AlarmClockWrapper>
                    <h1>Настройка будильника</h1>
                    <DatePicker
                        floatingLabelText="Выберите дату"
                        defaultDate={this.state.minDate}
                        onChange={this.handleChangeMinDate}
                    />
                    <TimePicker
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
