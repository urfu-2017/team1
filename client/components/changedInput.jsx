import React from 'react';

import PropTypes from 'prop-types';

import { ChangedInputWrapper } from '../styles/changedInput';

export default class ChangedInput extends React.Component { // eslint-disable-line
    static propTypes = {
        value: PropTypes.string,
        placeholder: PropTypes.string,
        validate: PropTypes.func
    }

    static defaultProps = {
        value: '',
        placeholder: '',
        validate: value => { return true; }
    }

    state = {
        value: this.props.value,
        changeMode: false,
        initialValue: this.props.value
    }

    onChangeHandler = e => {
        this.setState({ value: e.target.value.trim() });
    }

    onKeypressHandler = e => {
        if (e.which === 13) {
            e.preventDefault();
            if (!this.props.validate(this.state.value)) {
                this.setState({ value: this.state.initialValue });
            }
            this.setChangeModeState(false);
        }
    }

    setChangeModeState = state => {
        this.setState({ changeMode: state });
    }

    render() {
        const { value, changeMode, placeholder } = this.state;
        return (<ChangedInputWrapper>
            { changeMode ?
                <div className="changed-input-edit__input">
                    <input className="changed-input-edit__input"
                        type="text"
                        value={value}
                        placeholder={placeholder}
                        onChange={this.onChangeHandler}
                        onKeyPress={this.onKeypressHandler} />
                </div> :
                <div className="changed-input-label">
                    <div className="changed-input-label__label" onClick={() => { this.setChangeModeState(true); }}>{value}</div>
                </div> 
            }
        </ChangedInputWrapper>);
    }
}
