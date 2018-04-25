import { connect } from 'react-redux';
import ChatWindow from '../components/chatWindow';
import { addMessageFromChatInput, sendMessage } from '../actions/actions';

const mapStateToProps = state => ({
    user: state.currentInfo.currentUser,
    chat: state.currentInfo.currentChat
});

const mapDispatchToProps = dispatch => ({
    addMessageFromChatInput: (chat, message) => {
        dispatch(addMessageFromChatInput(chat, message));
    },
    sendMessage: (chat, message) => {
        dispatch(sendMessage(chat, message));
    }
});

export default connect(mapStateToProps, mapDispatchToProps)(ChatWindow);
