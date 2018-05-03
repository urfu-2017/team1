import React from 'react';
import PropTypes from 'prop-types';
import {graphql} from 'react-apollo';

import { Editor, DownloadImage, DownloadButton, CreateButton, Exit } from '../styles/imageHandler';
import {UpdateUserAvatar} from '../graphqlQueries/mutations';
import {withCurrentUser} from '../lib/currentUserContext';
import ImageHandler from './imageHandler';


@withCurrentUser
@graphql(UpdateUserAvatar.mutation, { props: UpdateUserAvatar.map })

export default class ProfileEditor extends React.PureComponent {
    static isSaved = false;
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
        this.state = {};
    }

    saveAvatar = () => {
        const userId = this.props.currentUser.id;
        const reader = new window.FileReader();

        this.readPictureFromInput(reader, async () => {
            const avatarData = reader.result;
            this.props.updateUserAvatar({
                userId: userId,
                avatarUrl: avatarData
            });
        });
        ProfileEditor.isSaved = true;
    };

    drawBackground = () => {
        const reader = new window.FileReader();
        this.readPictureFromInput(reader, () => {
            const dataUrl = reader.result;
            console.log(dataUrl);
            const area = document.getElementById('area-for-drop');
            area.style.backgroundImage = `url(${dataUrl})`;
        });
    };

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
    };

    render() {
        if (ProfileEditor.isSaved) {
            ProfileEditor.isSaved = false;
            return null;
        }
        const { mainComponentChanger } = this.props;
        return (
            <Editor>
                <div
                    className="editorName"
                    style={{ position: "absolute", justifyContent: "center", alignItems: "center",
                        display: "flex", background: "#5682a3", color: "#fff", width: "100%", top: "0" }}>
                    <Exit
                        style= {{ top: 0 }}
                        onClick={mainComponentChanger('Chat')}
                    >
                        &#10006;
                    </Exit>
<<<<<<< e5fc3fb7e1c8d2d9c84aad1d1afc8ede303a9dcc
                    <h1
=======
                    <h1 
>>>>>>> change design
                        style={{ margin: "0" }}
                        className="header"
                        >
                            Загрузить аватар
                    </h1>
<<<<<<< e5fc3fb7e1c8d2d9c84aad1d1afc8ede303a9dcc
                </div>
=======
                </div>    
>>>>>>> change design
                <DownloadImage
                    style={{ marginTop: "50" }}
                    onDrop={this.drop}
                    onDragOver={this.dragover}
                    id="area-for-drop">
                    <p className="text" id="download_image_text">Загрузить фото</p>
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
            </Editor>
        );
    }
}