import { connect } from 'react-redux';

import { setGroupChatEditorState, setProfileEditorState } from '../actions/actions';

import Menu from '../components/menu';

const mapStateToProps = (state, props) => ({
    user: state.currentInfo.user,
    groupChatEditorState: state.currentInfo.groupChatEditorState
});

const mapDispatchToProps = dispatch => ({
    setGroupChatEditorState: state => {
        dispatch(setGroupChatEditorState(state));
    },
    setProfileEditorState: state => {
        dispatch(setProfileEditorState(state));
    }
});

export default connect(mapStateToProps, mapDispatchToProps)(Menu);
