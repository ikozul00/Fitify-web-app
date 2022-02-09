import {ADD_TO_CART, DECREASE_AMOUNT, INCREASE_AMOUNT, REMOVE_FROM_CART} from "../constants/actions";

const initialState = {
    items:[],
    quantity:[0]
}

  

const cartReducer = (state = initialState, action) => {
    switch (action.type) {
        case ADD_TO_CART:
            {
                const itemExists=state.items.find((item) => (item.id===action.payload.id && item.size===action.payload.size));
                const amount=(Number)(action.amount);
                if(!itemExists){
                    state.items.push({ ...action.payload, amount: amount });
                }
                else{
                    itemExists.amount=amount+(Number)(itemExists.amount);
                }
                state.quantity[0]+=amount;
                return {...state};
            }

        case INCREASE_AMOUNT:
            {
                const itemExists=state.items.find((item) => (item.id===action.payload.id && item.size===action.payload.size));
                if(itemExists){
                    itemExists.amount+=1;
                    state.items=[...state.items];
                    state.quantity[0]+=1;
                    return {...state};
                }
                else{
                   return state;
                }
            }

        case DECREASE_AMOUNT:
            {
                const itemExists=state.items.find((item) => (item.id===action.payload.id && item.size===action.payload.size));
                if(itemExists){
                    itemExists.amount-=1;
                    state.items=[...state.items];
                    state.quantity[0]-=1;
                    return {...state};
                }
                else{
                    return state;
                }
            }

        case REMOVE_FROM_CART:
            {
                const itemExists=state.items.find((item) => (item.id===action.payload.id && item.size===action.payload.size));
                if(itemExists){
                    state.items = state.items.filter (item => (item.id!==action.payload.id || item.size!==action.payload.size))
                    state.quantity[0]-=itemExists.amount;
                    return {...state};
                }
                else{
                    return state;
                }
            }

        default:
            return state
    }
}

export default cartReducer;
