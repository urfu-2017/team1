import { connect } from 'react-redux';
import ChatWindow from '../components/chatWindow';
import { addMessageFromChatInput, sendMessage, setReactionToMessage } from '../actions/actions';

const mapStateToProps = state => ({
    user: state.currentInfo.currentUser,
    chat: state.currentInfo.currentChat,
    socketURL: state.socketURL,
    groupChatEditorState: state.currentInfo.groupChatEditorState
});

const mapDispatchToProps = dispatch => ({
    addMessageFromChatInput: (chat, message) => {
        dispatch(addMessageFromChatInput(chat, message));
    },
    sendMessage: (chat, message) => {
        dispatch(sendMessage(chat, message));
    },
    setReactionToMessage: (chat, message, reactionId) => {
        dispatch(setReactionToMessage(chat, message, reactionId));
    }
});

export default connect(mapStateToProps, mapDispatchToProps)(ChatWindow);
