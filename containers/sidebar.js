import { connect } from 'react-redux';
import Contacts from '../components/contacts';

import { setVisibilityChat, setVisibilityMenu, selectChat } from '../actions/actions';

const mapStateToProps = state => ({
    chats: state.allChats,
    selectedChatId: state.selectedChatId,
    openMenu: state.openMenu
});

const mapDispatchToProps = dispatch => (
    {
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
)(Contacts);

export default Sidebar;
