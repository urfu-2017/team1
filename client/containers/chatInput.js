import { connect } from 'react-redux';
import ChatInput from '../components/chatWindowInput';

import {
    selectChat,
    asyncSendMessage,
    setVisibilityChat,
    addMessageFromChatInput
} from '../actions/actions';

const mapStateToProps = (state, props) => ({
    allChats: state.allChats,
    serverURL: state.meta.serverURL,
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
        asyncSendMessage: (message, serverURL) => {
            dispatch(asyncSendMessage(message, serverURL));
        },
        addMessageFromChatInput: message => {
            dispatch(addMessageFromChatInput(message));
        }
    }
);

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(ChatInput);
