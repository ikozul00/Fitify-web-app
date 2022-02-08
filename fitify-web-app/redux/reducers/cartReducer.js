import {ADD_TO_CART} from "../constants/actions";

const initialState = {
    items:[]
}

  

const cartReducer = (state = initialState, action) => {
    switch (action.type) {
        case ADD_TO_CART:
            {
                state.items.push({ ...action.payload, quantity: 1 });
                return state;
            }
        default:
            return state
    }
}

export default cartReducer;
