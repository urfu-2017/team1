module.exports = {
    webpack: (config, { buildId, dev, isServer, defaultLoaders }) => {
        config = {
            devServer: {
                hot: false
            }
        };
        return config;
    },
    webpackDevMiddleware: config => {
        // Perform customizations to webpack dev middleware config

        // Important: return the modified config
        return config;
    }
};
