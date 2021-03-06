import Document, { Head, Main, NextScript } from 'next/document';
import { ServerStyleSheet, injectGlobal } from 'styled-components';


injectGlobal`
    html {
        width: 100%;
        height: 100%;
        margin: 0;
    }
    body {
        font-family: 'Roboto Condensed';
        width: 100%;
        height: 100%;
        margin: 0;
    }
    body > div:first-child
    {
        height: 100%;
    }
`;


export default class MyDocument extends Document {
    static getInitialProps({ renderPage }) {
        const sheet = new ServerStyleSheet();
        const page = renderPage(App => props => sheet.collectStyles(<App {...props} />));
        const styleTags = sheet.getStyleElement();
        return { ...page, styleTags };
    }

    render() {
        return (
            <html lang='ru'>
                <Head>
                    <link rel="stylesheet" type="text/css" href="/static/css/font.css" />
                    <title>Team 1 Kilogram</title>
                    {this.props.styleTags}
                </Head>
                <body>
                    <Main />
                    <NextScript />
                </body>
            </html>
        );
    }
}
