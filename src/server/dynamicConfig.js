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
        req.serverUrl = process.env.URL;
    }

    enableProxy() {
        // TODO: hmmmm
        const url = process.env.URL.startsWith('https://') ?
                    process.env.URL.slice('https://'.length) :
                        process.env.URL.startsWith('http://') ?
                        process.env.URL.slice('http://'.length) :
                        process.env.URL;
        this.httpUrl = `https://${url}/${process.env.PROXY_SECRET}/proxy/http`;
        // this.wsUrl = `wss://${url}/${process.env.PROXY_SECRET}/proxy/ws`;
        this.wsUrl = process.env.WS_PROXY_URL;
    }

    disableProxy() {
        this.httpUrl = process.env.HTTP_API_URL;
        this.wsUrl = process.env.WS_API_URL;
    }

    proxySwitcher(value) {
        if (value)
            return (req, res) => this.enableProxy() || res.send('Proxy enabled');
        return (req, res) => this.disableProxy() || res.send('Proxy disabled');
    }
}


module.exports = DynamicConfig;
