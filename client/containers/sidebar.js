import { connect } from 'react-redux';
import Chats from '../components/chats';

import { setVisibilityChat, setVisibilityMenu, selectChat, setVisibilityContacts } from '../actions/actions';

const mapStateToProps = (state, props) => ({
    allChats: state.allChats,
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
            dispatch(selectChat(chat.id));
            dispatch(setVisibilityChat(chat));
        },
        onClick: visibility => {
            dispatch(setVisibilityMenu(visibility));
        }
    }
);

const Sidebar = connect(
    mapStateToProps,
    mapDispatchToProps
)(Chats);

export default Sidebar;
