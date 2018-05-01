import { connect } from 'react-redux';
import ProfileEditor from '../components/profileEditor';
import { changeAvatar, setProfileEditorState } from '../actions/actions';

const mapStateToProps = (state, props) => ({
    user: state.user
});

const mapDispatchToProps = dispatch => ({
    onChangeAvatar: avatarData => {
        dispatch(changeAvatar(avatarData));
    },
    setProfileEditorState: state => {
        dispatch(setProfileEditorState(state));
    }
});

export default connect(mapStateToProps, mapDispatchToProps)(ProfileEditor);
