import { connect } from 'react-redux';

import { setGroupChatCreatorState, setProfileEditorState } from '../actions/actions';

import Menu from '../components/menu';

const mapStateToProps = (state, props) => ({
    user: state.currentInfo.currentUser,
    groupChatEditorState: state.currentInfo.groupChatEditorState
});

const mapDispatchToProps = dispatch => ({
    setGroupChatCreatorState: state => {
        dispatch(setGroupChatCreatorState(state));
    },
    setProfileEditorState: state => {
        dispatch(setProfileEditorState(state));
    }
});

export default connect(mapStateToProps, mapDispatchToProps)(Menu);
