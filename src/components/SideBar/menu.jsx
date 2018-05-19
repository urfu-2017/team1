import React from 'react';
import {Mutation} from 'react-apollo';
import PropTypes from 'prop-types';
import FlatButton from 'material-ui/FlatButton';
import Group from 'material-ui/svg-icons/social/group';
import Person from 'material-ui/svg-icons/social/people';
import ModeEdit from 'material-ui/svg-icons/editor/mode-edit';

import {MenuRoot} from '../../styles/menu';
import List from 'material-ui/List/List';
import ListItem from 'material-ui/List/ListItem';
import Avatar from 'material-ui/Avatar';

import Contacts from '../contacts';
import {GetUserChats} from '../../graphql/queries';
import {CreateGroupChat, UpdateUserIsNightTheme} from '../../graphql/mutations';
import withLocalState from '../../lib/withLocalState';


const getNewChat = currentUser => ({
    title: 'Новый чат',
    picture: currentUser.avatarUrl,
    ownerId: currentUser.id,
    userId: currentUser.id
});


@withLocalState
export default class Menu extends React.Component {
    static propTypes = {
        currentUser: PropTypes.shape(),
        mainComponentChanger: PropTypes.func
    };

    static defaultProps = {
        currentUser: {}
    };

    // лапшаааааа
    createChatMutation = (currentUser, InnerComponent) => (
        <Mutation
            mutation={CreateGroupChat.mutation}
            update={
                (cache, { data: { currentUser, createChat } }) => {
                    cache.writeQuery({
                        query: GetUserChats.query,
                        data: { User: { ...currentUser } },
                        variables: { userId: currentUser.id }
                    });
                    this.props.updateCurrentChatId(createChat.id);
                    this.props.mainComponentChanger('Chat')(null, { editorOpened: true });
                }
            }
        >{
            createGroupChat => InnerComponent(() => {
                const chat = getNewChat(currentUser);
                createGroupChat({ variables: { ...chat } });
            })
        }</Mutation>
    );

    render() {
        const { currentUser, mainComponentChanger, toggleParanja } = this.props;
        return (
            <MenuRoot>
                <List className="list">
                    <ListItem
                        disabled
                        className="menu"
                        onClick={mainComponentChanger('Profile')}
                        leftAvatar={
                            <Avatar className="avatar" src={currentUser.avatarUrl}/>
                        }
                    >
                        {currentUser.name}
                    </ListItem>
                    <ListItem
                        leftIcon={<Person/>}
                        className="list__item"
                        onClick={mainComponentChanger('Contacts')}
                    >
                        Контакты
                    </ListItem>
                    <ListItem
                        leftIcon={<ModeEdit/>}
                        className="list__item"
                        onClick={mainComponentChanger('Profile')}
                    >
                        Редактирование профиля
                    </ListItem>
                    {this.createChatMutation(currentUser, (onClick) => (
                        <ListItem
                            leftIcon={<Group/>}
                            className="list__item"
                            onClick={onClick}
                        >
                            Создать чат
                        </ListItem>
                    ))}
                </List>
                <Mutation
                    mutation={UpdateUserIsNightTheme.mutation}
                    variables={{ userId: currentUser.id, isNightTheme: !currentUser.isNightTheme}}
                    optimisticResponse={UpdateUserIsNightTheme
                        .optimisticResponse(currentUser.id, !currentUser.isNightTheme)}
                >{
                    updateUserIsNightTheme =>
                        <FlatButton
                            label="Сменить тему"
                            onClick={() => {
                                toggleParanja();
                                updateUserIsNightTheme();
                                localStorage
                                    .setItem('isNightTheme', JSON.stringify(!currentUser.isNightTheme));
                            }} />
                }</Mutation>
            </MenuRoot>
        );
    }
}
