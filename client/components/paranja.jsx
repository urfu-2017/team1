import React, { Fragment, Component } from 'react';
import PropTypes from 'prop-types';
import Menu from '../containers/menu';

import Contacts from '../containers/contacts';
import ProfileEditor from '../containers/profileEditor';
import GroupChatCreate from '../components/groupChat';

import { ParanjaWrapper } from '../styles/paranja';

export default class Paranja extends Component {
    static propTypes = {
        user: PropTypes.shape(),
        isOpenParanja: PropTypes.bool,
        showParanja: PropTypes.func,
        profileEditorState: PropTypes.bool,
        groupChatEditorState: PropTypes.bool
    };

    static defaultProps = {
        user: {},
        isOpenParanja: false,
        showParanja: () => {},
        profileEditorState: false,
        groupChatEditorState: false
    };
    constructor(props) {
        super(props);
        this.state = {
            visible: false,
            isOpenContacts: false
        };
    }

    setHeader = header => { this.setState({ header }); }
    handleCancel = e => { this.setState({ visible: false }); }
    showContacts = isOpen => { this.setState({ isOpenContacts: isOpen }); }

    render() {
        const { user, isOpenParanja, showParanja, profileEditorState, groupChatEditorState } = this.props;

        return (
            <Fragment>
                { isOpenParanja && (
                    <ParanjaWrapper onClick={() => { showParanja(false); }} >
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
                    <ParanjaWrapper onClick={() => { showParanja(false); this.showContacts(false); }}>
                        <Contacts
                            header={this.state.header}
                        />
                    </ParanjaWrapper>)
                }
                { profileEditorState && (
                    <ParanjaWrapper>
                        <ProfileEditor
                            user={user}
                            showParanja={showParanja}
                        />
                    </ParanjaWrapper>)
                }
                { groupChatEditorState && (
                    <ParanjaWrapper>
                        <GroupChatCreate />
                    </ParanjaWrapper>
                )}
            </Fragment>
        );
    }
}
