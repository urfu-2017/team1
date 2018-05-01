import { connect } from 'react-redux';

import { setGroupChatEditorState, createGroupChat } from '../actions/actions';

import GroupChatCreate from '../components/groupChatCreate';

const mapStateToProps = (state, props) => ({
    contacts: state.contacts
});

const mapDispatchToProps = dispatch => ({
    setGroupChatEditorState: state => {
        dispatch(setGroupChatEditorState(state));
    },
    createGroupChat: (name, userIds) => {
        dispatch(createGroupChat(name, userIds));
    }
});

export default connect(mapStateToProps, mapDispatchToProps)(GroupChatCreate);
