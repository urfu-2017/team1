import { connect } from 'react-redux';
import Chats from '../components/chats';

import {
    setVisibilityChat,
    addNewChatFromSocket,
    setVisibilityAddUser,
    setVisibilityParanja,
    selectChat
} from '../actions/actions';

const mapStateToProps = (state, props) => ({
    selectedChatId: state.currentInfo.selectedChatId,
    currentChat: state.currentInfo.currentChat,
    user: state.currentInfo.currentUser,
    allChats: state.allChats,
    contacts: state.contacts,
    meta: state.meta
});

const mapDispatchToProps = dispatch => (
    {
        onClickChat: chat => {
            dispatch(selectChat(chat.id));
            dispatch(setVisibilityChat(chat));
        },
        addNewChatFromSocket: (chat, currentUserId) => {
            dispatch(addNewChatFromSocket(chat, currentUserId));
        },
        visibilityAddUser: visibility => {
            dispatch(setVisibilityAddUser(visibility));
        },
        showParangja: visibility => {
            dispatch(setVisibilityParanja(visibility));
        }
    }
);

const Sidebar = connect(
    mapStateToProps,
    mapDispatchToProps
)(Chats);

export default Sidebar;
