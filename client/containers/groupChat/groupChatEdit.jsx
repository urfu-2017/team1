import { connect } from 'react-redux';

import { setGroupChatEditorState, editChat } from '../../actions/actions';

import GroupChatEdit from '../../components/groupChat/groupChatEdit';

const mapStateToProps = (state, props) => ({
    chat: state.currentInfo.editedChat,
    contacts: state.contacts,
    serverURL: state.currentInfo.serverURL
});

const mapDispatchToProps = dispatch => ({
    setGroupChatEditorState: chat => {
        dispatch(setGroupChatEditorState(chat));
    },
    editChat: (chat, name, userIds) => {
        dispatch(editChat(chat, name, userIds));
    }
});

export default connect(mapStateToProps, mapDispatchToProps)(GroupChatEdit);
