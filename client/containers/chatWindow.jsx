import { connect } from 'react-redux';
import ChatWindow from '../components/chatWindow';
import { addMessageFromChatInput, sendMessage, setReactionToMessage, setImageSenderState } from '../actions/actions';

const mapStateToProps = state => ({
    user: state.currentInfo.currentUser,
    chat: state.currentInfo.currentChat,
    socketURL: state.socketURL,
    groupChatEditorState: state.currentInfo.groupChatEditorState,
    editedChat: state.currentInfo.editedChat,
    imageSenderState: state.currentInfo.imageSenderState
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
    },
    setImageSenderState: state => {
        dispatch(setImageSenderState(state));
    }
});

export default connect(mapStateToProps, mapDispatchToProps)(ChatWindow);
