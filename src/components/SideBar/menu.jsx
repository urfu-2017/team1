import React from 'react';
import {Mutation} from 'react-apollo';
import PropTypes from 'prop-types';
import Group from 'material-ui/svg-icons/social/group';
import Person from 'material-ui/svg-icons/social/people';
import ModeEdit from 'material-ui/svg-icons/editor/mode-edit';
import RaisedButton from 'material-ui/RaisedButton';

import {MenuRoot} from '../../styles/menu';
import List from 'material-ui/List/List';
import ListItem from 'material-ui/List/ListItem';
import Avatar from 'material-ui/Avatar';

import Contacts from '../contacts';
import {GetUserChats} from '../../graphqlQueries/queries';
import {CreateGroupChat} from '../../graphqlQueries/mutations';
import {withLocalState} from '../../lib/withLocalState';


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
        const { currentUser, mainComponentChanger } = this.props;
        return (
            <MenuRoot>
                <List style={{padding: "0"}}>
                    <ListItem
                        style={{color: "#fff", background: "#5682a3", height: "18px"}}
                        disabled
                        onClick={mainComponentChanger('Profile')}
                        leftAvatar={
                            <Avatar src={currentUser.avatarUrl} />
                        }
                    >
                        {currentUser.name}
                    </ListItem>
                    <ListItem
                        leftIcon={<Person />}
                        style={{height: "58px", border: "2px solid lavender", borderBottom: "none",
                            display: "flex", alignItems: "center"}}
                        onClick={mainComponentChanger('Contacts')}
                    >
                        Контакты
                    </ListItem>
                    <ListItem
                        leftIcon={<ModeEdit />}
                        style={{height: "58px", border: "2px solid lavender", borderBottom: "none",
                            display: "flex", alignItems: "center"}}
                        onClick={mainComponentChanger('Profile')}
                    >
                        Редактирование профиля
                    </ListItem>
                    {this.createChatMutation(currentUser, (onClick) => (
                        <ListItem
                            leftIcon={<Group />}
                            style={{height: "58px", border: "2px solid lavender", borderBottom: "none",
                            display: "flex", alignItems: "center"}}
                            onClick={onClick}
                        >
                            Создать чат
                        </ListItem>
                    ))}
                </List>
                <RaisedButton label="Сменить тему" />
            </MenuRoot>
        );
    }
}
