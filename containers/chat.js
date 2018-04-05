import { connect } from 'react-redux';
import Chat from '../components/chat';

const mapStateToProps = state => ({ messages: state.currentChat.messages });

export default connect(mapStateToProps)(Chat);
