import { connect } from 'react-redux';
import ChatWindow from '../components/chatWindow';
import { setVisibilityAddUser } from '../actions/actions';

const mapStateToProps = state => ({
    messages: state.currentInfo.currentChat.messages,
    title: state.currentInfo.currentChat.title,
    currentChatId: state.currentInfo.currentChat.id,
    currentUserId: state.currentInfo.currentUser.id,
    serverURL: state.meta.serverURL,
    allChats: state.allChats
});
const mapDispatchToProps = dispatch => (
    {
        visibilityAddUser: visibility => {
            dispatch(setVisibilityAddUser(visibility));
        }
    }
);

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(ChatWindow);
