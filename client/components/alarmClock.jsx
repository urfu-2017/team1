import React from 'react';

import Toggle from 'material-ui/Toggle';
import TimePicker from 'material-ui/TimePicker';
import { List, ListItem } from 'material-ui/List';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import RaisedButton from 'material-ui/RaisedButton';

import Editor from '../styles/editor';

export default class AlarmClocks extends React.Component {
    constructor(props) {
        super(props);
        this.state = { value: 1 };
    }
    handleChange = (event, index, value) => this.setState({ value });

    createNewAlarmClock = () => {
        let time = this.time.state.time;

        if (!time) return null;

        const hour = this.time.state.time.getHours();
        const minute = this.time.state.time.getMinutes();
        time = `${hour}:${minute}`;

        const music = this.music.props.value;
        if (!music) return null;

        const switched = this.repeat.state.switched;

        return { time, music, repeat: switched };
    }

    render() {
        const list = {
            width: '80%'
        };
        const { showAlarmClock, showNewAlarmClock, addAlarmClock } = this.props;
        return (
            <Editor>
                <h1>Настройки</h1>
                <List style={list}>
                    <ListItem
                        primaryText="Повторять"
                        rightToggle={<Toggle ref={node => { this.repeat = node; }} />}
                    />
                </List>
                <SelectField
                    ref={node => { this.music = node; }}
                    floatingLabelText="Мелодия"
                    value={this.state.value}
                    onChange={this.handleChange}
                >
                    <MenuItem value={1} primaryText="Первая" />
                    <MenuItem value={2} primaryText="Вторая" />
                    <MenuItem value={3} primaryText="Третья" />
                    <MenuItem value={4} primaryText="Четвертая" />
                    <MenuItem value={5} primaryText="Пятая" />
                </SelectField>

                <TimePicker
                    ref={node => { this.time = node; }}
                    okLabel="Ок"
                    cancelLabel="Закрыть"
                    floatingLabelText="Выберите время"
                    format="24hr"
                    hintText="24hr Format"
                />
                <RaisedButton
                    onClick={() => { showAlarmClock(true); showNewAlarmClock(false); }}
                    label="Отмена"
                />
                <RaisedButton
                    onClick={() => {
                        if (this.createNewAlarmClock()) {
                            addAlarmClock(this.createNewAlarmClock());
                            showAlarmClock(true);
                            showNewAlarmClock(false);
                        }
                    }}
                    label="Ок"
                />
            </Editor>
        );
    }
}
