import React from 'react';


export default class ScrollButton extends React.Component {
    constructor() {
        super();

        this.state = {
            intervalId: 0
        };
    }

    scrollStep() {
        const messagesBlock = document.getElementById('messages');
        const { scrollHeight } = messagesBlock;
        if (messagesBlock.pageYOffset !== scrollHeight) {
            console.info('window.pageYOffset', window.pageYOffset);
            console.info('scrollHeight', scrollHeight);
            clearInterval(this.state.intervalId);
        }
        messagesBlock.scroll(0.0, scrollHeight - this.props.scrollStepInPx);
    }

    scrollToBottom() {
        let intervalId = setInterval(this.scrollStep.bind(this), this.props.delayInMs);
        this.setState({ intervalId });
    }

    render() {
        return (
            <Button
                type="button"
                title="Жмяк вниз"
                value="&#11167;"
                className="scroll"
                onClick={() => { this.scrollToBottom(); }}
            />
        );
    }
}
