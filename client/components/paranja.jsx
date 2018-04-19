import React, { Fragment, Component } from 'react';
import PropTypes from 'prop-types';
import Menu from './menu';

import Contacts from '../containers/contacts';
import ProfileEditor from './profileEditor';
import ChatEditor from './chatEditor';

import { ParanjaWrapper } from '../styles/paranja';

export default class Paranja extends Component {
    static propTypes = {
        contacts: PropTypes.arrayOf(PropTypes.object),
        currentChat: PropTypes.shape(),
        visibilityAddUser: PropTypes.func,
        isOpenChatEditor: PropTypes.func,
        isOpenParanja: PropTypes.bool,
        showParangja: PropTypes.func,
        user: PropTypes.shape()
    };

    static defaultProps = {
        user: {},
        contacts: [],
        currentChat: {},
        isOpenParanja: false,
        showParangja: () => {},
        isOpenChatEditor: () => {},
        visibilityAddUser: () => {}
    };
    constructor(props) {
        super(props);
        this.state = {
            visible: false,
            isOpenEditor: false,
            isOpenContacts: false
        };
    }

    setHeader = header => { this.setState({ header }); }
    handleCancel = e => { this.setState({ visible: false }); }
    showEditor = isOpen => { this.setState({ isOpenEditor: isOpen }); }
    showContacts = isOpen => { this.setState({ isOpenContacts: isOpen }); }

    render() {
        const {
            user,
            contacts,
            currentChat,
            showParangja,
            isOpenParanja,
            isOpenChatEditor,
            visibilityAddUser
        } = this.props;

        return (
            <Fragment>
                { isOpenParanja && (
                    <ParanjaWrapper onClick={() => { showParangja(false); }} >
                        { !this.state.visible && (
                            <Menu
                                user={user}
                                setHeader={this.setHeader}
                                showEditor={this.showEditor}
                                showContacts={this.showContacts}
                            />)
                        }
                    </ParanjaWrapper>
                )}
                { this.state.isOpenContacts && (
                    <ParanjaWrapper onClick={() => { showParangja(false); this.showContacts(false); }}>
                        <Contacts
                            header={this.state.header}
                        />
                    </ParanjaWrapper>)
                }
                { this.state.isOpenEditor && (
                    <ParanjaWrapper onClick={() => { showParangja(false); this.showEditor(false); }}>
                        <ProfileEditor />
                    </ParanjaWrapper>)
                }
                { isOpenChatEditor && (
                    <ParanjaWrapper onClick={() => { showParangja(false); visibilityAddUser(false); }}>
                        <ChatEditor
                            contacts={contacts}
                            currentChat={currentChat}
                            showContacts={this.showContacts}
                        />
                    </ParanjaWrapper>)
                }
            </Fragment>
        );
    }
}
