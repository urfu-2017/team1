export default function initialReducer(initialProps) {
    const initialState = Object.assign({}, initialProps);
    return (state = initialState, action) => {
        switch(action.type){
            default: return state;
        }
    }
}
