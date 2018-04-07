import { connect } from 'react-redux';
import Chat from '../components/chat';

const mapStateToProps = state => ({ messages: state.currentChat.messages, title: state.currentChat.title });

export default connect(mapStateToProps)(Chat);
