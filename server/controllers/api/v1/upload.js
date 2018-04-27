const cloudinary = require('cloudinary');

class UploadController {
    static async avatar(req, res) {
        const { imageData } = req.body;
        cloudinary.uploader.upload(imageData, async data => {
            const { user } = req;
            user.avatar = data.secure_url;
            await user.save();
            res.status(200).send(data);
        });
    }
}

module.exports = { UploadController };
