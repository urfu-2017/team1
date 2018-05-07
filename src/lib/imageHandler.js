import { Component } from 'react';

const MAX_FILE_SIZE = 100000;


class ImageHandler extends Component {
    getFirstFile = () => {
        const inputUpload = document.getElementById('upload');
        return inputUpload.files[0];
    };

    setTextDownloadArea = message => {
        const input = document.getElementById('download_image_text');
        input.textContent = message;
    };

    dragover = e => {
        e.preventDefault();
        e.stopPropagation();
    };

    drop = e => {
        e.preventDefault();
        e.stopPropagation();
        const inputUpload = document.getElementById('upload');
        inputUpload.value = e.dataTransfer.files;
    };

    drawBackground = () => {
        const reader = new window.FileReader();
        this.readPictureFromInput(reader, () => {
            this.setTextDownloadArea('Сохраните фотографию');
            const dataUrl = reader.result;
            const area = document.getElementById('area-for-drop');
            area.style.backgroundImage = `url(${dataUrl})`;
        });
    };

    readPictureFromInput = (reader, cb) => {
        reader.onloadend = async () => {
            cb();
        };
        const image = this.getFirstFile();
        if (!image) {
            this.setTextDownloadArea('Не выбран файл');
            const dropArea = document.getElementById('area-for-drop');
            dropArea.style.backgroundImage = 'none';

            return;
        }
        if (image.size >= MAX_FILE_SIZE) {
            this.setTextDownloadArea('Размер вашей фотографии не должен превышать 1 MB. ' +
                'Для снятия ограничения переведите $15 на hakaton2018team1@yandex.ru');
            const dropArea = document.getElementById('area-for-drop');
            dropArea.style.backgroundImage = 'none';

            return;
        }
        reader.readAsDataURL(image);
    };
}

export default ImageHandler;
