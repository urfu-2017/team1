import React from 'react';
import PropTypes from 'prop-types';
import Menu from './menu';

import Contacts from './contacts';
import ProfileEditor from './profileEditor';
import { ParanjaWrapper } from '../styles/paranja';


export default class Paranja extends React.Component {
    static propTypes = {
        user: PropTypes.shape(),
        isParanjaOpened: PropTypes.bool,
        showParangja: PropTypes.func
    };

    static defaultProps = {
        user: {},
    };

    constructor(props) {
        super(props);
        this.state = {
            isOpenEditor: false,
            isOpenContacts: false
        };
    }

    setHeader = header => { this.setState({ header }); };
    handleCancel = e => { this.setState({ visible: false }); };
    showEditor = isOpen => { this.setState({ isOpenEditor: isOpen }); };
    showContacts = isOpen => { this.setState({ isOpenContacts: isOpen }); };

    render() {
        const { user, toggleParanja } = this.props;

        return (
            <React.Fragment>
                <ParanjaWrapper onClick={toggleParanja} >
                    <Menu
                        user={user}
                        setHeader={this.setHeader}
                        showEditor={this.showEditor}
                        showContacts={this.showContacts}
                    />
                </ParanjaWrapper>
                {/*{ this.state.isOpenContacts && (*/}
                    {/*<ParanjaWrapper onClick={() => { setParanjaVisibility(false); this.showContacts(false); }}>*/}
                        {/*<Contacts header={this.state.header} />*/}
                    {/*</ParanjaWrapper>)*/}
                {/*}*/}
                {/*{ this.state.isOpenEditor && (*/}
                    {/*<ParanjaWrapper onClick={() => { setParanjaVisibility(false); this.showEditor(false); }}>*/}
                        {/*<ProfileEditor />*/}
                    {/*</ParanjaWrapper>)*/}
                {/*}*/}
            </React.Fragment>
        );
    }
}
