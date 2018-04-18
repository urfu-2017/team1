import { connect } from 'react-redux';
import Contacts from '../components/contacts'

import {
    selectChat,
    asyncCreateChat,
    setVisibilityChat,
    addChatFromContacts
} from '../actions/actions';

const mapStateToProps = (state, props) => ({
    user: state.currentInfo.currentUser,
    contacts: state.contacts
});

const mapDispatchToProps = dispatch => (
    {
        onClickChat: chat => {
            dispatch(selectChat(chat.id));
            dispatch(setVisibilityChat(chat));
        },
        asyncCreateChat: (chat, serverURL, onClickChat) => {
            dispatch(asyncCreateChat(chat, serverURL, onClickChat));
        },
        addChatFromContacts: chat => {
            dispatch(addChatFromContacts(chat));
        }
    }
);

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Contacts);