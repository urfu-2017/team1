import { connect } from 'react-redux';
import ChatWindow from '../components/chatWindow';

const mapStateToProps = state => ({
    messages: state.currentInfo.currentChat.messages,
    title: state.currentInfo.currentChat.title,
    currentChatId: state.currentInfo.currentChat.id,
    currentUserId: state.currentInfo.currentUser.id,
    serverURL: state.meta.serverURL,
    allChats: state.allChats
});

export default connect(mapStateToProps)(ChatWindow);
