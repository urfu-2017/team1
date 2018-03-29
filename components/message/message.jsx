import React from 'react';

export default class Message extends React.Component {
    render() {
        const { message, creationTime } = this.props;
        return (
            <React.Fragment>
                <article>
                    <div dangerouslySetInnerHTML={{ __html: message }} />
                    <time>{ creationTime }</time>
                </article>
            </React.Fragment>
        );
    }
}
