import React from 'react';
import PropTypes from 'prop-types';

import { Editor, DownloadImage, DownloadButton, CreateButton, Exit } from '../styles/imageHandler';
import ImageHandler from './imageHandler';


class ProfileEditor extends ImageHandler {
    static propTypes = {
        showParanja: PropTypes.func,
        onChangeAvatar: PropTypes.func,
        setProfileEditorState: PropTypes.func
    };

    constructor(props) {
        super(props);
        this.state = {};
    }

    saveAvatar = () => {
        const { onChangeAvatar } = this.props;
        const reader = new window.FileReader();

        this.readPictureFromInput(reader, async () => {
            onChangeAvatar(reader.result);
        });
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
