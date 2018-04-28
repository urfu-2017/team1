import React from 'react';
import {graphql, Mutation} from 'react-apollo';
import PropTypes from 'prop-types';

import {MenuRoot} from '../../styles/menu';
import Contacts from '../contacts';
import {GetUserChats} from '../../graphqlQueries/queries';
import {CreateGroupChat} from '../../graphqlQueries/mutations';
import {UpdateCurrentChatId} from '../../graphqlQueries/localState';


const getNewChat = currentUser => ({
    title: 'Новый чат',
    picture: currentUser.avatarUrl,
    ownerId: currentUser.id,
    userId: currentUser.id
});


@graphql(UpdateCurrentChatId.query, {
    props: UpdateCurrentChatId.map
})
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
                <div className="profile" onClick={mainComponentChanger('Profile')}>
                    <img
                        alt="Изображение аватарки"
                        className="profile__avatar"
                        src={currentUser.avatarUrl}
                    />
                    <div className="profile__name">{currentUser.name}</div>
                </div>
                <main>
                    <p
                        role="presentation"
                        className="menu__item"
                        onClick={mainComponentChanger('Contacts')}
                    >
                        Контакты
                    </p>
                    <p
                        role="presentation"
                        className="menu__item"
                        onClick={mainComponentChanger('Profile')}
                    >
                        Редактирование профиля
                    </p>
                    {this.createChatMutation(currentUser, (onClick) => (
                        <p
                            role="presentation"
                            className="menu__item"
                            onClick={onClick}>
                            Создать чат
                        </p>
                    ))}
                </main>
            </MenuRoot>
        );
    }
}
