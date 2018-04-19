import React, { Component } from 'react';
import { Editor, DowlandImage, DowlandButton, CreateButton } from '../styles/profileEditor';
import { sendToCloudServer } from '../actions/actions';

export default class ProfileEditor extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    addFirstFile = files => {
        state.file = files[0];
    };

    allowDrop = ev => {
        console.log('allowDrop');
        ev.preventDefault();
    };

    drop = ev => {
        console.log('drop');
        ev.preventDefault();
        this.addFirstFile(ev.dataTransfer.files);
    };

    saveAvatar = () => {
        console.log('saveAvatar');
        const reader = new FileReader();
        reader.onloadend = async () => {
            const dataUrl = reader.result;
            const metaData = await sendToCloudServer(dataUrl);
            console.log(metaData.secure_url);
        };
        reader.readAsDataURL(state.file);
    };


    render() {
        return (
            <Editor >
                <h1 className="header">Загрузить аватар</h1>
                <DowlandImage>
                    <p className="text">Загрузить фото</p>
                    ondrop={this.drop}
                    ondragover={this.allowDrop}
                </DowlandImage>
                <div className="buttons">
                    <DowlandButton
                        type="file"
                        accept="image/*"
                        value="Загрузить"
                        onchange={this.addFirstFile}
                    />
                    <CreateButton
                        id="saveAvatar"
                        type="button"
                        value="Сохранить"
                        onclick={this.saveAvatar}
                    />
                </div>
            </Editor >
        );
    }
}
