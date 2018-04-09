import { connect } from 'react-redux';
import Contacts from '../components/contacts';

import { setVisibilityChat, setVisibilityMenu, selectChat } from '../actions/actions';

const mapStateToProps = state => ({
    allChats: state.allChats,
    selectedChatId: state.currentInfo.selectedChatId,
    openMenu: state.currentInfo.openMenu,
    currentUserId: state.currentInfo.currentUser.id
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
