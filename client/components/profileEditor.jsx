import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { Editor, DownloadImage, DownloadButton, CreateButton, Exit } from '../styles/profileEditor';
import { sendAvatar, setAvatar } from '../actions/actions';

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

    getFirstFile = () => {
        const inputUpload = document.getElementById('upload');

        return inputUpload.files[0];
    };

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
            this.setTextDownloadArea('');
            const spinner = document.getElementById('spinner');
            spinner.style.display = 'block';
            const dataUrl = reader.result;
            const metaData = await sendAvatar(dataUrl);
            const urlToAvatar = metaData.secure_url;
            if (urlToAvatar) {
                this.props.dispatch(setAvatar(urlToAvatar));
                this.setTextDownloadArea('Аватарка загружена');
            } else {
                this.setTextDownloadArea('Произошла ошибка, попробуйте попозже');
            }
            spinner.style.display = 'none';
        });
    };

    drawBackground = () => {
        const reader = new FileReader();
        this.readPictureFromInput(reader, () => {
            this.setTextDownloadArea('');
            const dataUrl = reader.result;
            const dropArea = document.getElementById('area-for-drop');
            dropArea.style.backgroundImage = `url(${dataUrl})`;
        });
    };

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
    };

    setTextDownloadArea = message => {
        const input = document.getElementById('download_image_text');
        input.textContent = message;
    };


    render() {
        return (
            <Editor>
                <Exit onClick={() => {
                    this.props.showParangja(false);
                    this.props.showEditor(false);
                }}
                >
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
                    <div
                        className="spinner"
                        id="spinner"
                    />
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

export default connect()(ProfileEditor);
