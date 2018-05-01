import { connect } from 'react-redux';

import { setGroupChatEditorState } from '../../actions/actions';

import GroupChatEdit from '../../components/groupChat/groupChatEdit';

const mapStateToProps = (state, props) => ({
    chat: state.currentInfo.editedChat,
    contacts: state.contacts
});

const mapDispatchToProps = dispatch => ({
    setGroupChatEditorState: chat => {
        dispatch(setGroupChatEditorState(chat));
    }
});

export default connect(mapStateToProps, mapDispatchToProps)(GroupChatEdit);
