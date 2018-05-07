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
        const { currentUser, mainComponentChanger, isNightTheme } = this.props;
        const borderColor = isNightTheme ? '#424242' : 'lavender';
        const background = isNightTheme ? '#37474F': '#5682a3';

        return (
            <MenuRoot isNightTheme={isNightTheme}>
                <List style={{padding: "0"}}>
                    <ListItem
                        style={{background, height: "18px", color: '#fff'}}
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
                        style={{height: "58px", border: `2px solid ${borderColor}`, borderBottom: "none",
                            borderLeft: "none", display: "flex", alignItems: "center"}}
                        onClick={mainComponentChanger('Contacts')}
                    >
                        Контакты
                    </ListItem>
                    <ListItem
                        leftIcon={<ModeEdit />}
                        style={{height: "58px", border: `2px solid ${borderColor}`, borderBottom: "none",
                            borderLeft: "none", display: "flex", alignItems: "center"}}
                        onClick={mainComponentChanger('Profile')}
                    >
                        Редактирование профиля
                    </ListItem>
                    {this.createChatMutation(currentUser, (onClick) => (
                        <ListItem
                            leftIcon={<Group />}
<<<<<<< 392ca0cd1db14b6ab95d17038c5e7dd225e0158d
                            style={{height: "58px", border: "2px solid lavender", borderBottom: "none",
                            display: "flex", alignItems: "center"}}
                            onClick={onClick}
=======
                            style={{height: "58px", border: `2px solid ${borderColor}`,
                                borderLeft: "none",display: "flex", alignItems: "center"}}
                            onClick={onClick} 
>>>>>>> night theme v_3
                        >
                            Создать чат
                        </ListItem>
                    ))}
                </List>
                <input type="button" className="button" value="Сменить тему" />
            </MenuRoot>
        );
    }
}
