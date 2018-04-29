import React, { Component } from 'react';
import PropTypes from 'prop-types';
import List from 'material-ui/List/List';
import ListItem from 'material-ui/List/ListItem';
import Avatar from 'material-ui/Avatar';

import { MenuRoot } from '../styles/menu';

export default class Menu extends Component {
    static propTypes = {
        user: PropTypes.shape(),
        setEvent: PropTypes.func,
        showContacts: PropTypes.func,
        setProfileEditorState: PropTypes.func
    }

    static defaultProps = {
        user: {},
        setEvent: () => {},
        showContacts: () => {},
        setProfileEditorState: () => {}
    }

    constructor(props) {
        super(props);
        this.state = {};
    }

    render() {
        const { user, setEvent } = this.props;
        const { showContacts, setProfileEditorState, showAlarmClock } = this.props;
        return (
            <MenuRoot>
                <List>
                    <ListItem
                        disabled
                        leftAvatar={
                            <Avatar src={user.avatar} />
                        }
                    >
                        {user.name}
                    </ListItem>
                    <ListItem
                        onClick={() => { showContacts(true); setEvent('addNewChat'); }}
                    >
                        Контакты
                    </ListItem>
                    <ListItem
                        onClick={() => { setProfileEditorState(true); }}
                    >
                        Редактирование профиля
                    </ListItem>
                    <ListItem
                        onClick={() => { showAlarmClock(true); }}
                    >
                        Будильник
                    </ListItem>
                </List>
            </MenuRoot>
        );
    }
}
