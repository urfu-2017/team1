import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {graphql} from 'react-apollo';

import {Editor, DownloadImage, DownloadButton, CreateButton, Exit} from '../styles/profile';
import {UpdateUserAvatar} from '../graphqlQueries/mutations';
import {withCurrentUser} from '../lib/currentUserContext';
import ImageHandler from '../lib/imageHandler';
import LoadScreen from '../components/ui/loadScreen';
import {Snackbar} from 'material-ui';


@withCurrentUser
@graphql(UpdateUserAvatar.mutation, { props: UpdateUserAvatar.map })
export default class ProfileEditor extends Component {
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

        this.imageHandler = new ImageHandler(this.props.currentUser.avatarUrl);
        this.state = {
            isUploading: false,
            snackbarOpened: false,
            statusMessage: ''
        };
    }

    saveAvatar = () => {
        const userId = this.props.currentUser.id;
        const reader = new window.FileReader();

        this.imageHandler.readPictureFromInput(reader, async () => {
            const avatarData = reader.result;
            const uploadTask = this.props.updateUserAvatar({
                userId: userId,
                avatarUrl: avatarData
            })
                .then(this.toggleSnackbar.bind(this, 'Загружено'))
                .catch(this.toggleSnackbar.bind(this, 'Ошибка :('));
            this.imageHandler.setTextDownloadArea('');
            this.setState({ isUploading: true });
            await uploadTask;
            this.setState({ isUploading: false });

            setTimeout(() => this.imageHandler.setTextDownloadArea(''), 8000);
        });
    };

    toggleSnackbar = statusMessage => {
        this.setState(prev => ({ snackbarOpened: !prev.snackbarOpened, statusMessage }));
    };

    changeBackground = () => {
        this.imageHandler.state.backgroundUploaded = false;
        this.imageHandler.drawBackground();
    };

    render() {
        const { mainComponentChanger, currentUser } = this.props;

        return (
            <Editor>
                <div
                    className="editorName"
                >
                    <Exit
                        onClick={mainComponentChanger('Chat')}
                    >
                        &#10006;
                    </Exit>
                    <h1 className="header">
                        Загрузить аватар
                    </h1>
                </div>
                <DownloadImage
                    style={{ 'background-image': `url(${currentUser.avatarUrl})` }}
                    onDrop={this.imageHandler.drop}
                    onDragOver={this.imageHandler.dragover}
                    id="area-for-drop">
                    <p className="text" id="download_image_text">Загрузить фото</p>
                </DownloadImage>
                {this.state.isUploading && <LoadScreen/>}
                <div className="buttons">
                    <DownloadButton
                        id="upload"
                        type="file"
                        accept="image/*"
                        onChange={this.changeBackground}
                    />
                    <CreateButton
                        id="saveAvatar"
                        type="button"
                        value="Сохранить"
                        onClick={this.saveAvatar}
                    />
                </div>
                <Snackbar
                    open={this.state.snackbarOpened}
                    message={this.state.statusMessage}
                    onRequestClose={this.toggleSnackbar}
                    autoHideDuration={3000}
                />
            </Editor>
        );
    }
}
