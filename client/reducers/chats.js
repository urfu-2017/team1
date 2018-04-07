const initialState = [
    {
        title: 'First Chat Title',
        picture: 'path-to-chat-pic.jpeg',
        id: 'ALPHANUMEfRIC_ID',
        lastMessage: {
            content: {
                text: 'message text',
                attachments: [],
                pictures: []
            },
            sender: {
                name: 'user1',
                avatar: 'path-to-avatar.jpeg',
                id: 'ALPHANUMERIC_ID'
            }
        },
        messages: [
            {
                content: {
                    text: 'message text',
                    attachments: [],
                    pictures: []
                },
                sender: {
                    name: 'user1',
                    avatar: 'path-to-avatar.jpeg',
                    id: 'ALPHANUMERIC_ID'
                }
            },
            {
                content: {
                    text: 'message text',
                    attachments: [],
                    pictures: []
                },
                sender: {
                    name: 'user2',
                    avatar: 'path-to-avatar.jpeg',
                    id: 'ALPHANUMERIC_ID'
                }
            },
            {
                content: {
                    text: 'message text',
                    attachments: [],
                    pictures: []
                },
                sender: {
                    name: 'user1',
                    avatar: 'path-to-avatar.jpeg',
                    id: 'ALPHANUMERIC_ID'
                }
            }
        ]
    },
    {
        title: 'Second Chat Title',
        picture: 'path-to-chat-pic.jpeg',
        id: 'ALPHANUMERIC_ID',
        lastMessage: {
            content: {
                text: 'message text',
                attachments: [],
                pictures: []
            },
            sender: {
                name: 'user2',
                avatar: 'path-to-avatar.jpeg',
                id: 'ALPHANUMERIC_ID'
            }
        },
        messages: [
            {
                content: {
                    text: 'message',
                    attachments: [],
                    pictures: []
                },
                sender: {
                    name: 'user1',
                    avatar: 'path-to-avatar.jpeg',
                    id: 'ALPHANUMERIC_ID'
                }
            }
        ]
    }
];

export default function chats(state = initialState, action) {
    return state;
}
