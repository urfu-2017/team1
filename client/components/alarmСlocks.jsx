import React from 'react';

import Toggle from 'material-ui/Toggle';
import RaisedButton from 'material-ui/RaisedButton';
import { List, ListItem } from 'material-ui/List';
import AlarmClock from '../containers/alarmClock';

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
                primaryText={alarmClock.time}
                rightToggle={<Toggle />}
            />
        ))
    )
    disableDates = date => date < this.state.minDate;
    showNewAlarmClock = isOpen => this.setState({ isOpenNewAlarmClock: isOpen })
    render() {
        const { showAlarmClock, user } = this.props;
        const list = {
            height: '225px',
            width: '80%',
            border: '1px solid'
        };
        console.log('Будиьники');
        
        console.log(user.alarmClocks);
        
        return (
            <Editor>
                <h1>Будильник</h1>
                { !this.state.isOpenNewAlarmClock && (
                    <React.Fragment>
                        <List style={list}>
                            {this.getAlarmClocks()}
                        </List>
                        <RaisedButton
                            label="Отмена"
                            onClick={() => { showAlarmClock(false); }}
                        />
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
