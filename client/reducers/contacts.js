import { UPDATE_CONTACT_LIST } from '../actions/actions';

export default function contactsReducer(state = [], action) {
    switch (action.type) {
    case UPDATE_CONTACT_LIST: {
        return action.contacts;
    }
    default: return state;
    }
}
