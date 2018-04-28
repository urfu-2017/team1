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

    render() {
        const { showAlarmClock, showNewAlarmClock } = this.props;
        return (
            <Editor>
                <List>
                    <h1>Настройки</h1>
                    <ListItem
                        primaryText="Повторять"
                        rightToggle={<Toggle />}
                    />
                </List>
                <SelectField
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
                    onClick={() => { showAlarmClock(true); showNewAlarmClock(false); }}
                    label="Ок"
                />
            </Editor>
        );
    }
}
