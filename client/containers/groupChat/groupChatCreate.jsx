import { connect } from 'react-redux';

import { setGroupChatCreatorState, createGroupChat } from '../../actions/actions';

import GroupChatCreate from '../../components/groupChat/groupChatCreate';

const mapStateToProps = (state, props) => ({
    contacts: state.contacts
});

const mapDispatchToProps = dispatch => ({
    setGroupChatCreatorState: state => {
        dispatch(setGroupChatCreatorState(state));
    },
    createGroupChat: (name, userIds) => {
        dispatch(createGroupChat(name, userIds));
    }
});

export default connect(mapStateToProps, mapDispatchToProps)(GroupChatCreate);
