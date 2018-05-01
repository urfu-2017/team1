import { connect } from 'react-redux';
import Paranja from '../components/paranja';

import {
    setVisibilityParanja
} from '../actions/actions';

const mapStateToProps = (state, props) => ({
    currentChat: state.currentInfo.currentChat,
    isOpenChatEditor: state.currentInfo.isOpenChatEditor,
    isOpenParanja: state.currentInfo.isOpenParanja,
    chatsMembers: state.currentInfo.chatsMembers,
    user: state.currentInfo.currentUser,
    contacts: state.contacts,
    profileEditorState: state.currentInfo.profileEditorState,
    groupChatEditorState: state.currentInfo.groupChatEditorState
});

const mapDispatchToProps = dispatch => ({
    showParanja: visibility => {
        dispatch(setVisibilityParanja(visibility));
    }
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Paranja);
