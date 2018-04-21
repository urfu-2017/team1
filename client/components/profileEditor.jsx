import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { Editor, DowlandImage, DowlandButton, CreateButton } from '../styles/profileEditor';
import { sendToCloudServer, setAvatar } from '../actions/actions';

class ProfileEditor extends Component {
    static propTypes = {
        user: PropTypes.object,
        dispatch: PropTypes.func
    };

    static defaultProps = {
        dispatch: {},
        user: {}
    };

    constructor(props) {
        super(props);
        this.state = {};
    }

    getFirstFile = e => {
        const inputUpload = document.getElementById('upload');

        return inputUpload.files[0];
    }

    dragover = e => {
        e.preventDefault();
        e.stopPropagation();
    };

    drop = e => {
        e.preventDefault();
        e.stopPropagation();
        const inputUpload = document.getElementById('upload');
        inputUpload.files = e.dataTransfer.files;
    };

    saveAvatar = () => {
        const reader = new FileReader();
        reader.onloadend = async () => {
            const dataUrl = reader.result;
            console.log('before await');
            const metaData = await sendToCloudServer(dataUrl);
            const urlToAvatar = metaData.secure_url;
            console.log(urlToAvatar);
            this.props.dispatch(setAvatar(urlToAvatar));
        };
        const avatar = this.getFirstFile();
        if (!avatar) {
            console.log('не подгружен файл');
            return;
        }
        reader.readAsDataURL(avatar);
    };


    render() {
        const { user } = this.props;
        console.log('user');
        console.log(user);

        return (
            <Editor>
                <h1 className="header">Загрузить аватар</h1>
                <DowlandImage
                    ondrop={this.drop}
                    ondragover={this.dragover}
                >
                    <p className="text">Загрузить фото</p>
                </DowlandImage>
                <div className="buttons">
                    <DowlandButton
                        id="upload"
                        type="file"
                        accept="image/*"
                    />
                    <CreateButton
                        id="saveAvatar"
                        type="button"
                        value="Сохранить"
                        onClick={this.saveAvatar}
                    />
                </div>
            </Editor >
        );
    }
}

export default connect()(ProfileEditor);
