const cloudinary = require('cloudinary');

class UploadController {
    static async avatar(req, res) {
        const { avatarData } = req.body;
        cloudinary.uploader.upload(avatarData, async data => {
            const { user } = req;
            user.avatar = data.secure_url;
            await user.save();
            res.status(200).send({ avatar: user.avatar });
        });
    }
}

module.exports = { UploadController };
