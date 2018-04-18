import { connect } from 'react-redux';
import Chats from '../components/chats';

import { setVisibilityChat, setVisibilityParanja, selectChat, addNewChatFromSocket } from '../actions/actions';

const mapStateToProps = (state, props) => ({
    isOpenParanja: state.currentInfo.isOpenParanja,
    allChats: state.allChats,
    selectedChatId: state.currentInfo.selectedChatId,
    user: state.currentInfo.currentUser,
    contacts: state.contacts,
    meta: state.meta
});

const mapDispatchToProps = dispatch => (
    {
        onClickChat: chat => {
            dispatch(selectChat(chat.id));
            dispatch(setVisibilityChat(chat));
        },
        showParangja: visibility => {
            dispatch(setVisibilityParanja(visibility));
        },
        addNewChatFromSocket: (chat, currentUserId) => {
            dispatch(addNewChatFromSocket(chat, currentUserId));
        }
    }
);

const Sidebar = connect(
    mapStateToProps,
    mapDispatchToProps
)(Chats);

export default Sidebar;
