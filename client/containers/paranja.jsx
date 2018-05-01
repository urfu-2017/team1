import { connect } from 'react-redux';
import Paranja from '../components/paranja';
import {
    setVisibilityAddUser,
    setVisibilityParanja
} from '../actions/actions';

const mapStateToProps = state => ({
    currentChat: state.currentInfo.currentChat,
    isOpenChatEditor: state.currentInfo.isOpenChatEditor,
    isOpenParanja: state.currentInfo.isOpenParanja,
    chatsMembers: state.currentInfo.chatsMembers,
    user: state.currentInfo.currentUser,
    contacts: state.contacts
});
const mapDispatchToProps = dispatch => (
    {
        visibilityAddUser: visibility => {
            dispatch(setVisibilityAddUser(visibility));
        },
        showParanja: visibility => {
            dispatch(setVisibilityParanja(visibility));
        }
    }
);

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Paranja);