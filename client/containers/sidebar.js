import { connect } from 'react-redux';
import Chats from '../components/chats';

import { setVisibilityChat, setVisibilityMenu, selectChat } from '../actions/actions';

const mapStateToProps = (state, props) => ({
    allChats: state.allChats,
    selectedChatId: state.currentInfo.selectedChatId,
    openMenu: state.currentInfo.openMenu,
    user: state.initial.user
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
)(Chats);

export default Sidebar;
