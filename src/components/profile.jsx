import React from 'react';
import { Editor, DownloadImage, DownloadButton, CreateButton } from '../styles/profile';


export default class Profile extends React.PureComponent {
    render() {
        return (
            <Editor >
                <h1 className="header">Загрузить аватар</h1>
                <DownloadImage>
                    <p className="text">Загрузить фото</p>
                </DownloadImage>
                <div className="buttons">
                    <DownloadButton type="button" value="Загрузить" />
                    <CreateButton type="button" value="Сохранить" />
                </div>
            </Editor >
        );
    }
}
