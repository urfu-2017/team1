export default function createUsersReducer(usersProps) {
    const initialState = Object.assign([], usersProps);
    return (state = initialState, action) => {
        switch (action.type) {
        default: return state;
        }
    };
}