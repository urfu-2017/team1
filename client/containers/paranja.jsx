import { connect } from 'react-redux';
import Paranja from '../components/paranja';

const mapStateToProps = (state, props) => ({
    profileEditorState: state.currentInfo.profileEditorState,
    groupChatEditorState: state.currentInfo.groupChatEditorState
});

const mapDispatchToProps = dispatch => ({
});

export default connect(mapStateToProps, mapDispatchToProps)(Paranja);
