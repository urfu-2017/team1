import { connect } from 'react-redux';
import Chats from '../components/chats';

import {
    setVisibilityChat,
    selectChat,
    setVisibilityParanja,
    addChatFromContacts,
    fetchChats,
    fetchContacts
} from '../actions/actions';

const mapStateToProps = (state, props) => ({
    chats: state.chats,
    isOpenParanja: state.currentInfo.isOpenParanja,
    selectedChatId: state.currentInfo.selectedChatId,
    user: state.currentInfo.currentUser,
    contacts: state.contacts,
    meta: state.meta
});

const mapDispatchToProps = dispatch => (
    {
        onClickChat: chat => {
            dispatch(selectChat(chat._id));
            dispatch(setVisibilityChat(chat));
        },
        showParanja: visibility => {
            dispatch(setVisibilityParanja(visibility));
        },
        addChatFromContacts: chat => {
            dispatch(addChatFromContacts(chat));
        },
        fetchChats: () => {
            dispatch(fetchChats());
        },
        fetchContacts: () => {
            dispatch(fetchContacts());
        }
    }
);

const Sidebar = connect(
    mapStateToProps,
    mapDispatchToProps
)(Chats);

export default Sidebar;
