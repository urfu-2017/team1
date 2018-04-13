const contacts = [{
    id: 'ID_2',
    name: 'Максим',
    img: 'https://ru.seaicons.com/wp-content/uploads/2015/08/blue-user-icon.png'
},
{
    id: 'ID_2',
    name: 'Максим',
    img: 'https://ru.seaicons.com/wp-content/uploads/2015/08/blue-user-icon.png'
},
{
    id: 'ID_2',
    name: 'Максим',
    img: 'https://ru.seaicons.com/wp-content/uploads/2015/08/blue-user-icon.png'
},
{
    id: 'ID_2',
    name: 'Максим',
    img: 'https://ru.seaicons.com/wp-content/uploads/2015/08/blue-user-icon.png'
},
{
    id: 'ID_2',
    name: 'Максим',
    img: 'https://ru.seaicons.com/wp-content/uploads/2015/08/blue-user-icon.png'
},
{
    id: 'ID_2',
    name: 'Максим',
    img: 'https://ru.seaicons.com/wp-content/uploads/2015/08/blue-user-icon.png'
},
{
    id: 'ID_2',
    name: 'Максим',
    img: 'https://ru.seaicons.com/wp-content/uploads/2015/08/blue-user-icon.png'
},
{
    id: 'ID_1',
    name: 'Максим',
    img: 'https://ru.seaicons.com/wp-content/uploads/2015/08/blue-user-icon.png'
},
{
    id: 'ID_1',
    name: 'Максим',
    img: 'https://ru.seaicons.com/wp-content/uploads/2015/08/blue-user-icon.png'
},
{
    id: 'ID_1',
    name: 'Максим',
    img: 'https://ru.seaicons.com/wp-content/uploads/2015/08/blue-user-icon.png'
}];

export default function createUsersReducer(usersProps) {

    const initialState = Object.assign([], contacts);
    return (state = initialState, action) => {
        switch (action.type) {
        default: return state;
        }
    };
}