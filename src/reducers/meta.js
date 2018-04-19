export default function createMetaReducer(metaProps) {
    const initialState = Object.assign({}, metaProps);
    return (state = initialState, action) => {
        switch (action.type) {
        default: return state;
        }
    };
}