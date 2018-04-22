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
        selectChat: id => {
            dispatch(selectChat(id));
        },
        setVisibilityChat: chat => {
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
