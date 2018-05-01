import React from 'react';

import ChangedInput from './changedInput';
import { GroupChatCreateWrapper } from '../styles/groupChat';

export default class GroupChatCreate extends React.Component { // eslint-disable-line

    constructor() {
        super();
        this.state = {
            name: 'Новый чат'
        };
    }

    validateChatName(name) {
        return name.trim() && name.length > 255;
    }

    render() {
        return (<GroupChatCreateWrapper>
            <div>
                <div><ChangedInput value={this.state.name} placeholder="Имя чата" validate={this.validateChatName} /></div>
                <div></div>
                <div className="group-chat-create__buttons">
                    <button>Создать</button>
                    <button>Закрыть</button>
                </div>
            </div>
        </GroupChatCreateWrapper>);
    }
};
