import React from 'react';
import PropTypes from 'prop-types';
import {graphql} from 'react-apollo';

import {Editor, DownloadImage, DownloadButton, CreateButton, Exit} from '../styles/profile';
import {UpdateUserAvatar} from '../graphqlQueries/mutations';
import {withCurrentUser} from '../lib/currentUserContext';
import ImageHandler from '../lib/imageHandler';
import LoadScreen from '../components/ui/loadScreen';


@withCurrentUser
@graphql(UpdateUserAvatar.mutation, { props: UpdateUserAvatar.map })
export default class ProfileEditor extends ImageHandler {
    static propTypes = {
        currentUser: PropTypes.object,
        mainComponentChanger: PropTypes.func
    };

    static defaultProps = {
        currentUser: {},
        mainComponentChanger: {}
    };

    constructor(props) {
        super(props);
        this.state = { isDownloading: false };
    }

    saveAvatar = () => {
        const userId = this.props.currentUser.id;
        const reader = new window.FileReader();

        this.readPictureFromInput(reader, async () => {
            const avatarData = reader.result;
            const promiseDownloads = this.props.updateUserAvatar({
                userId: userId,
                avatarUrl: avatarData
            });
            this.setState({ isDownloading: true });
            promiseDownloads.then(() => {
                this.setState({ isDownloading: false });
                this.setTextDownloadArea('Аватарка обновлена');
            })
        });
    };

    render() {
        const { mainComponentChanger } = this.props;
        return (
            <Editor>
                <div
                    className="editorName"
                >
                    <Exit
                        style= {{ top: 0 }}
                        onClick={mainComponentChanger('Chat')}
                    >
                        &#10006;
                    </Exit>
                    <h1 className="header">
                        Загрузить аватар
                    </h1>
                </div>    
                <DownloadImage
                    onDrop={this.drop}
                    onDragOver={this.dragover}
                    id="area-for-drop">
                    <p className="text" id="download_image_text">Загрузить фото</p>
                    {
                        this.state.isDownloading ?
                            <LoadScreen/>
                            : ''
                    }
                </DownloadImage>
                <div className="buttons">
                    <DownloadButton
                        id="upload"
                        type="file"
                        accept="image/*"
                        onChange={this.drawBackground}
                        files.bind="selectedFiles"
                        change.delegate="onSelectFile($event)"
                    />
                    <CreateButton
                        id="saveAvatar"
                        type="button"
                        value="Сохранить"
                        onClick={this.saveAvatar}
                    />
                </div>
            </Editor>
        );
    }
}