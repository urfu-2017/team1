import React from 'react';

export default class Contact extends React.Component {
    render() {
        const { name } = this.props;
        return (
            <React.Fragment>
                <article>
                    <img src="" />
                    <p>{ name }</p>
                </article>
            </React.Fragment>
        );
    }
}
