import { connect } from 'react-redux';
import Contacts from '../components/contacts';

import { setVisibilityChat } from '../actions/actions';

const mapStateToProps = state => ({ allChats: state.allChats });

const mapDispatchToProps = dispatch => (
    {
        onClick: chat => {
            dispatch(setVisibilityChat(chat));
        }
    }
);

const Sidebar = connect(
    mapStateToProps,
    mapDispatchToProps
)(Contacts);

export default Sidebar;
