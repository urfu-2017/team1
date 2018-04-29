import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { Editor, DownloadImage, DownloadButton, CreateButton, Exit } from '../styles/profileEditor';


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
            this.setTextDownloadArea('');
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
            this.setTextDownloadArea('Не выбран файл');
            const dropArea = document.getElementById('area-for-drop');
            dropArea.style.backgroundImage = 'none';

            return;
        }
        reader.readAsDataURL(avatar);
    }

    setTextDownloadArea = message => {
        const input = document.getElementById('download_image_text');
        input.textContent = message;
    };

    render() {
        const { showParanja, setProfileEditorState } = this.props;
        return (
            <Editor>
                <Exit onClick={() => { showParanja(false); setProfileEditorState(false); }}>
                    &#10006;
                </Exit>
                <h1 className="header">Загрузить аватар</h1>
                <DownloadImage
                    onDrop={this.drop}
                    onDragOver={this.dragover}
                    id="area-for-drop"
                >
                    <p
                        className="text"
                        id="download_image_text"
                    >
                        Загрузить фото
                    </p>
                </DownloadImage>
                <div className="buttons">
                    <DownloadButton
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
