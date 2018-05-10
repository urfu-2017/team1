import { Component } from 'react';
import React from 'react';
import PropTypes from 'prop-types';

import { Editor, DownloadImage, DownloadButton, CreateButton, Exit } from '../../styles/imageHandler';
import ImageHandler from '../../lib/imageHandler';


class MessageImageSender extends Component {
    static propTypes = {
        onSendImage: PropTypes.func,
        closeImageSender: PropTypes.func
    };

    constructor(props) {
        super(props);
        this.imageHandler = new ImageHandler();
        this.state = {};
    }

    sendImage = () => {
        const { onSendImage } = this.props;
        const reader = new window.FileReader();

        this.imageHandler.readPictureFromInput(reader, async () => {
            onSendImage(reader.result);
        });
    };

    render() {
        const { closeImageSender } = this.props;

        return (
            <Editor>
                <div
                    className="editorName"
                >
                    <Exit onClick={() => { closeImageSender(false); }}>
                        &#10006;
                    </Exit>
                    <h1 className="header">Отправить картинку в чат</h1>
                </div>
                <DownloadImage
                    onDrop={this.imageHandler.drop}
                    onDragOver={this.imageHandler.dragover}
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
                        onChange={this.imageHandler.drawBackground}
                    />
                    <CreateButton
                        id="saveAvatar"
                        type="button"
                        value="Отправить"
                        onClick={this.sendImage}
                    />
                </div>
            </Editor>
        );
    }
}

export default MessageImageSender;