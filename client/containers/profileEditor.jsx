import { connect } from 'react-redux';
import ProfileEditor from '../components/profileEditor';
import { changeAvatar } from '../actions/actions';

const mapStateToProps = (state, props) => ({
    user: state.user
});

const mapDispatchToProps = dispatch => ({
    onChangeAvatar: avatarData => {
        dispatch(changeAvatar(avatarData));
    }
});

export default connect(mapStateToProps, mapDispatchToProps)(ProfileEditor);
