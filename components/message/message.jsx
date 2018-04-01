import React from 'react';
import PropTypes from 'prop-types';

export default class Message extends React.Component {
    static propTypes = {
        message: PropTypes.string,
        creationTime: PropTypes.string
    }

    static defaultProps = { message: '', creationTime: '' }

    constructor(props) {
        super(props);
        this.state = {};
    }
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
