module.exports = (io, serverURL) => async (req, res, next) => {
    req.ioServer = io;
    req.serverURL = process.env.URL;
    next();
};
