export default function createMetaReducer(initialProps) {
    const initialState = Object.assign({}, initialProps);
    return (state = initialState, action) => {
        switch (action.type) {
        default: return state;
        }
    };
}