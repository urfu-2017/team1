import React, { Component } from 'react';
import { Editor, DowlandImage, DowlandButton, CreateButton } from '../styles/profileEditor';

export default class ProfileEditor extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }
    render() {
        return (
            <Editor >
                <h1 className="header">Загрузить аватар</h1>
                <DowlandImage>
                    <p className="text">Загрузить фото</p>
                </DowlandImage>
                <div className="buttons">
                    <DowlandButton type="button" value="Загрузить" />
                    <CreateButton type="button" value="Сохранить" />
                </div>
            </Editor >
        );
    }
}