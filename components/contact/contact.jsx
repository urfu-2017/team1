import React from 'react';
import PropTypes from 'prop-types';

export default class Messages extends React.Component {
    static propTypes = {
        name: PropTypes.string
    }

    static defaultProps = { name: '' };

    constructor(props) {
        super(props);
        this.state = {};
    }
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
