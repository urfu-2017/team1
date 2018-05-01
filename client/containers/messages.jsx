import { connect } from 'react-redux';

import { setGroupChatEditorState } from '../actions/actions';

import Messages from '../components/messages';

const mapStateToProps = (state, props) => ({
});

const mapDispatchToProps = dispatch => ({
    setGroupChatEditorState: state => {
        dispatch(setGroupChatEditorState(state));
    }
});

export default connect(mapStateToProps, mapDispatchToProps)(Messages);
