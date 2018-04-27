import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { Editor, DowlandImage, DowlandButton, CreateButton, Exit } from '../styles/profileEditor';


class ProfileEditor extends Component {
    static propTypes = {
        showParanja: PropTypes.func,
        onChangeAvatar: PropTypes.func,
        setProfileEditorState: PropTypes.func
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
        const { onChangeAvatar } = this.props;
        const reader = new window.FileReader();

        this.readPictureFromInput(reader, async () => {
            onChangeAvatar(reader.result);
        });
    };

    drawBackground = () => {
        const reader = new window.FileReader();
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
        const { showParanja, setProfileEditorState } = this.props;
        return (
            <Editor>
                <Exit onClick={() => { showParanja(false); setProfileEditorState(false); }}>
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

export default ProfileEditor;
