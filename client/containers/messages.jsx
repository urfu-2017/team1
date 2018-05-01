import { connect } from 'react-redux';
import Messages from '../components/messages';
import { setVisibilityAddUser } from '../actions/actions';

const mapStateToProps = (state, props) => ({});

const mapDispatchToProps = dispatch => ({
    visibilityAddUser: visibility => {
        dispatch(setVisibilityAddUser(visibility));
    }
});

export default connect(mapStateToProps, mapDispatchToProps)(Messages);
