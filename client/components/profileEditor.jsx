import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { Editor, DowlandImage, DowlandButton, CreateButton, Exit } from '../styles/profileEditor';
import { sendToCloudServer, setAvatar } from '../actions/actions';

class ProfileEditor extends Component {
    static propTypes = {
        dispatch: PropTypes.func,
        showParangja: PropTypes.func,
        showEditor: PropTypes.func,
        user: PropTypes.object
    };

    static defaultProps = {
        dispatch: () => {},
        showParangja: () => {},
        showEditor: () => {},
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
        this.readPictureFromInput(reader, async () => {
            const dataUrl = reader.result;
            console.log('before await');
            const metaData = await sendToCloudServer(dataUrl);
            const urlToAvatar = metaData.secure_url;
            console.log(urlToAvatar);
            this.props.dispatch(setAvatar(urlToAvatar));
        });
    };

    drawBackground = () => {
        const reader = new FileReader();
        this.readPictureFromInput(reader, () => {
            const dataUrl = reader.result;
            const area = document.getElementById('area-for-drop');
            area.style.backgroundImage = `url(${dataUrl})`;
        });
    }

    readPictureFromInput = (reader, cb) => {
        reader.onloadend = async () => {
            cb();
        };
        const avatar = this.getFirstFile();
        if (!avatar) {
            console.log('не подгружен файл');
            return;
        }
        reader.readAsDataURL(avatar);
    }


    render() {
        return (
            <Editor>
                <Exit onClick={() => { this.props.showParangja(false); this.props.showEditor(false); }}>
                    &#10006;
                </Exit>
                <h1 className="header">Загрузить аватар</h1>
                <DowlandImage
                    onDrop={this.drop}
                    onDragOver={this.dragover}
                    id="area-for-drop"
                >
                    <p className="text">Загрузить фото</p>
                </DowlandImage>
                <div className="buttons">
                    <DowlandButton
                        id="upload"
                        type="file"
                        accept="image/*"
                        onChange={this.drawBackground}
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
