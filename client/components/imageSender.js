import React from 'react';
import PropTypes from 'prop-types';

import { Editor, DownloadImage, DownloadButton, CreateButton, Exit } from '../styles/imageHandler';
import ImageHandler from './imageHandler';


class ImageSender extends ImageHandler {
    static propTypes = {
        onSendImage: PropTypes.func,
        setImageSenderState: PropTypes.func,
        chat: PropTypes.shape()
    };

    constructor(props) {
        super(props);
        this.state = {};
    }

    sendImage = () => {
        const { onSendImage, chat } = this.props;
        const reader = new window.FileReader();

        this.readPictureFromInput(reader, async () => {
            onSendImage(chat, reader.result);
        });
    };


    render() {
        const { setImageSenderState } = this.props;

        return (
            <Editor>
                <Exit onClick={() => { setImageSenderState(false); }}>
                    &#10006;
                </Exit>
                <h1 className="header">Отправить картинку в чат</h1>
                <DownloadImage
                    onDrop={this.drop}
                    onDragOver={this.dragover}
                    id="area-for-drop"
                >
                    <p
                        className="text"
                        id="download_image_text"
                    >
                        Загрузить картинку
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
                        value="Отправить"
                        onClick={this.sendImage}
                    />
                </div>
            </Editor >
        );
    }
}

export default ImageSender;
