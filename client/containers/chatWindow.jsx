import { connect } from 'react-redux';
import ChatWindow from '../components/chatWindow';

const mapStateToProps = state => ({
    messages: state.currentInfo.currentChat.messages,
    title: state.currentInfo.currentChat.title,
    currentChatId: state.currentInfo.currentChat.id,
    currentUserId: state.currentInfo.currentUser.id,
    serverURL: state.meta.serverURL,
<<<<<<< HEAD
    weatherData: state.currentInfo.weatherData
=======
    allChats: state.allChats
>>>>>>> 78555161b5fd04efaae26a7eb738531e903f51ef
});

export default connect(mapStateToProps)(ChatWindow);
