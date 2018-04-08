import { connect } from 'react-redux';
import Chat from '../components/chat';

const mapStateToProps = state => ({ 
    messages: state.currentInfo.currentChat.messages,
    title: state.currentInfo.currentChat.title
});

export default connect(mapStateToProps)(Chat);
