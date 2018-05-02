import { connect } from 'react-redux';
import ImageSender from '../components/imageSender';
import { sendImage } from '../actions/actions';

const mapStateToProps = (state, props) => ({
    user: state.user
});

const mapDispatchToProps = dispatch => ({
    onSendImage: (chat, imageData) => {
        dispatch(sendImage(chat, imageData));
    }
});

export default connect(mapStateToProps, mapDispatchToProps)(ImageSender);
