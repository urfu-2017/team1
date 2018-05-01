import { connect } from 'react-redux';

import { setGroupChatEditorState, setVisibilityAddUser } from '../actions/actions';

import Messages from '../components/messages';

const mapStateToProps = (state, props) => ({});

const mapDispatchToProps = dispatch => ({
    setGroupChatEditorState: state => {
        dispatch(setGroupChatEditorState(state));
    },
    visibilityAddUser: visibility => {
        dispatch(setVisibilityAddUser(visibility));
    }
});

export default connect(mapStateToProps, mapDispatchToProps)(Messages);
