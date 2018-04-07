import { connect } from 'react-redux';
import Chat from '../components/chat';

const mapStateToProps = state => {
    return ({ messages: state.currentInfo.currentChat.messages })
};

export default connect(mapStateToProps)(Chat);
