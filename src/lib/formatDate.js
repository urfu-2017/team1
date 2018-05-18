const formatter = new Intl.DateTimeFormat('ru', {
    hour: 'numeric',
    minute: 'numeric',
    day: 'numeric',
    month: 'long'
}).format;


export default createdAt => formatter(new Date(createdAt));
