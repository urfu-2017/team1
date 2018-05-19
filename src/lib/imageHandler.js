const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5mb


class ImageHandler {
    constructor() {
        this.state = { backgroundUploaded: false };
    }

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
        this.state.backgroundUploaded = false;
        inputUpload.files = e.dataTransfer.files;
        setTimeout(this.drawBackground, 0);
    };

    drawBackground = () => {
        if (this.state.backgroundUploaded) {
            return;
        }
        const reader = new window.FileReader();
        this.readPictureFromInput(reader, () => {
            this.setTextDownloadArea('Ваше изображение прикреплено');
            const dataUrl = reader.result;
            this.setBackgroundImage(dataUrl);
        });
        this.state.backgroundUploaded = true;
    };

    setBackgroundImage = url => {
        const area = document.getElementById('area-for-drop');
        area.style.backgroundImage = `url(${url})`;
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
            this.setTextDownloadArea('Размер вашей фотографии не должен превышать 5 MB. ' +
                'Для снятия ограничения переведите $15 на hakaton2018team1@yandex.ru');
            const dropArea = document.getElementById('area-for-drop');
            dropArea.style.backgroundImage = 'none';

            return;
        }
        reader.readAsDataURL(image);
    };
}

export default ImageHandler;
