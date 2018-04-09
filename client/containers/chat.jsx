import { connect } from 'react-redux';
import Chat from '../components/chat';

const mapStateToProps = state => ({ 
    messages: state.currentInfo.currentChat.messages,
    title: state.currentInfo.currentChat.title,
    currentChatId: state.currentInfo.currentChat.id,
    currentUserId: state.currentInfo.currentUser.id
});

export default connect(mapStateToProps)(Chat);
