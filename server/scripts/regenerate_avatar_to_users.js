const mongoose = require('mongoose');
const cloudinary = require('cloudinary');

const { User } = require('../schemas/user');

const { getPictureInBase64 } = require('../lib/avatar-generation');

require('dotenv').config();

cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.API_KEY,
    api_secret: process.env.API_SECRET,
    stream: false
});

mongoose.connect(`mongodb://${process.env.MONGO_HOST}/${process.env.MONGO_DB}?authSource=admin`, {
    auth: {
        user: process.env.MONGO_USER,
        password: process.env.MONGO_PASSWORD
    }
});

(async () => {
    const users = await User.find({});
    
    for (let user of users) { // eslint-disable-line
        const avatarData = `data:image/png;base64,${await getPictureInBase64(user.githubId)}`;
        const promise = new Promise((resolve, reject) => {
            cloudinary.uploader.upload(avatarData, data => {
                resolve(data);
            });
        });
        const data = await promise;
        await User.update({ _id: user._id }, { avatar: data.secure_url });
    }
})().then(() => {
    mongoose.disconnect();
});

