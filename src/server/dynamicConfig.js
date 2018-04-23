'use strict';

require('dotenv').config();


class DynamicConfig {
    constructor(initialState, proxyEnabled = false) {
        this.initialState = initialState;
        if (proxyEnabled)
            this.enableProxy();
        else
            this.disableProxy();
    }

    configureReq(req) {
        req.state = this.initialState;
        req.httpUrl = this.httpUrl;
        req.wsUrl = this.wsUrl;
    }

    enableProxy() {
        const url = process.env.URL.startsWith('http://') ?
            process.env.URL.slice('http://'.length) :
            process.env.URL;
        this.httpUrl = `http://${url}/${process.env.PROXY_SECRET}/proxy/http`;
        this.wsUrl = `ws://${url}/${process.env.PROXY_SECRET}/proxy/ws`;
    }

    disableProxy() {
        this.httpUrl = process.env.HTTP_API_URL;
        this.wsUrl = process.env.WS_API_URL;
    }

    toggleProxyMiddleware(value) {
        if (value)
            return (req, res) => this.enableProxy() || res.send('Proxy enabled');
        return (req, res) => this.disableProxy() || res.send('Proxy disabled');
    }
}


module.exports = DynamicConfig;
