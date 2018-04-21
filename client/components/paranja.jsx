import React from 'react';
import PropTypes from 'prop-types';
import Menu from './menu';

import Contacts from '../containers/contacts';
import ProfileEditor from './profileEditor';
import ChatEditor from './chatEditor';

import { ParanjaWrapper } from '../styles/paranja';

export default class Paranja extends React.Component {
    static propTypes = {
        contacts: PropTypes.arrayOf(PropTypes.object),
        currentChat: PropTypes.shape(),
        visibilityAddUser: PropTypes.func,
        isOpenChatEditor: PropTypes.bool,
        isOpenParanja: PropTypes.bool,
        showParanja: PropTypes.func,
        user: PropTypes.shape()
    };

    static defaultProps = {
        user: {},
        contacts: [],
        currentChat: {},
        isOpenParanja: false,
        showParanja: () => {},
        isOpenChatEditor: false,
        visibilityAddUser: () => {}
    };
    constructor(props) {
        super(props);
        this.state = {
            event: '',
            visible: false,
            isOpenEditor: false,
            isOpenContacts: false
        };
    }

    setEvent = event => { this.setState({ event }); }
    handleCancel = e => { this.setState({ visible: false }); }
    showEditor = isOpen => { this.setState({ isOpenEditor: isOpen }); }
    showContacts = isOpen => { this.setState({ isOpenContacts: isOpen }); }

    render() {
        const {
            user,
            contacts,
            currentChat,
            showParanja,
            isOpenParanja,
            isOpenChatEditor,
            visibilityAddUser
        } = this.props;

        return (
            <React.Fragment>
                { isOpenParanja && (
                    <ParanjaWrapper onClick={() => { showParanja(false); }} >
                        { !this.state.visible && (
                            <Menu
                                user={user}
                                setEvent={this.setEvent}
                                showEditor={this.showEditor}
                                showContacts={this.showContacts}
                            />)
                        }
                    </ParanjaWrapper>
                )}
                { this.state.isOpenContacts && (
                    <ParanjaWrapper onClick={() => { showParanja(false); this.showContacts(false); }}>
                        <Contacts
                            event={this.state.event}
                            setContact={this.setContact}
                            visibilityAddUser={visibilityAddUser}
                        />
                    </ParanjaWrapper>)
                }
                { this.state.isOpenEditor && (
                    <ParanjaWrapper onClick={() => { showParanja(false); this.showEditor(false); }}>
                        <ProfileEditor />
                    </ParanjaWrapper>)
                }
                { isOpenChatEditor && (
                    <ParanjaWrapper onClick={() => {
                        showParanja(false);
                        visibilityAddUser(false);
                    }}
                    >
                        <ChatEditor
                            contacts={contacts}
                            setEvent={this.setEvent}
                            currentChat={currentChat}
                            showContacts={this.showContacts}
                        />
                    </ParanjaWrapper>)
                }
            </React.Fragment>
        );
    }
}
