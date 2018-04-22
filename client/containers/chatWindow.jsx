import { connect } from 'react-redux';
import ChatWindow from '../components/chatWindow';

const mapStateToProps = state => ({
    user: state.currentInfo.currentUser,
    chat: state.currentInfo.currentChat
});

export default connect(mapStateToProps)(ChatWindow);
