import { connect } from 'react-redux';
import Chats from '../components/chats';

import { setVisibilityChat, setVisibilityMenu, 
    selectChat, setVisibilityContacts, 
    asyncCreateChat, addChatFromContacts, fetchChats, fetchContacts } from '../actions/actions';

const mapStateToProps = (state, props) => ({
    chats: state.chats,
    selectedChatId: state.currentInfo.selectedChatId,
    openMenu: state.currentInfo.openMenu,
    openContacts: state.currentInfo.openContacts,
    user: state.currentInfo.currentUser,
    contacts: state.contacts,
    meta: state.meta
});

const mapDispatchToProps = dispatch => (
    {
        onClickContacts: visibility => {
            dispatch(setVisibilityContacts(visibility));
        },
        onClickChat: chat => {
            dispatch(selectChat(chat._id));
            dispatch(setVisibilityChat(chat));
        },
        onClick: visibility => {
            dispatch(setVisibilityMenu(visibility));
        },
        asyncCreateChat: (sourceUserId, targetUserId, onClickChat) => {
            dispatch(asyncCreateChat(sourceUserId, targetUserId, onClickChat));
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
