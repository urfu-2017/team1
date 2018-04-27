import React, { Fragment, Component } from 'react';
import PropTypes from 'prop-types';
import Menu from './menu';

import Contacts from '../containers/contacts';
import ProfileEditor from './profileEditor';
import { ParanjaWrapper } from '../styles/paranja';

export default class Paranja extends Component {
    static propTypes = {
        user: PropTypes.shape(),
        isOpenParanja: PropTypes.bool,
        showParanja: PropTypes.func
    };

    static defaultProps = {
        user: {},
        isOpenParanja: false,
        showParanja: () => {}
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
        const { user, isOpenParanja, showParanja } = this.props;

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
                { this.state.isOpenEditor && (
                    <ParanjaWrapper onClick={() => { isOpenParanja(false); this.showEditor(false); }}>
                        <ProfileEditor />
                    </ParanjaWrapper>)
                }
            </Fragment>
        );
    }
}
