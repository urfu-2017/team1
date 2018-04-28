import React from 'react';

import IntlPolyfill from 'intl';
import Toggle from 'material-ui/Toggle';
import RaisedButton from 'material-ui/RaisedButton';
import { List, ListItem } from 'material-ui/List';
import AlarmClock from './alarmClock';
// import areIntlLocalesSupported from 'intl-locales-supported';

import Editor from '../styles/editor';

export default class AlarmClocks extends React.Component {
    constructor(props) {
        super(props);

        const minDate = new Date();
        minDate.setFullYear(minDate.getFullYear() - 1);
        minDate.setHours(0, 0, 0, 0);
        this.state = {
            minDate,
            alarmClocks: [],
            isOpenNewAlarmClock: false
        };
    }

    getAlarmClocks = () => (
        this.state.alarmClocks.map(alarmClock => (
            <ListItem
                key={alarmClock.id}
                disabled={alarmClock.repeat}
                primaryText={alarmClock.time}
                rightToggle={<Toggle />}
            />
        ))
    )
    disableDates = date => date < this.state.minDate;
    showNewAlarmClock = isOpen => this.setState({ isOpenNewAlarmClock: isOpen })
    render() {
        // let DateTimeFormat;
        // if (areIntlLocalesSupported(['ru', 'ru-RU'])) {
        //     DateTimeFormat = global.Intl.DateTimeFormat;
        // } else {
        //     DateTimeFormat = IntlPolyfill.DateTimeFormat;
        //     require('intl/locale-data/jsonp/ru');
        //     require('intl/locale-data/jsonp/ru-RU');
        // }
        const { showAlarmClock } = this.props;
        return (
            <Editor>
                <h1>Будильник</h1>
                { !this.state.isOpenNewAlarmClock && (
                    <React.Fragment>
                        <List>
                            {this.getAlarmClocks()}
                        </List>
                        <RaisedButton
                            label="Добавить"
                            onClick={() => { this.showNewAlarmClock(true); }}
                        />
                    </React.Fragment>
                )}
                { this.state.isOpenNewAlarmClock && (
                    <AlarmClock
                        showAlarmClock={showAlarmClock}
                        showNewAlarmClock={this.showNewAlarmClock}
                    />
                )}
            </Editor>
        );
    }
}
