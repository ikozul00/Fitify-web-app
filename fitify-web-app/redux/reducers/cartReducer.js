import {ADD_TO_CART, DECREASE_AMOUNT, INCREASE_AMOUNT, REMOVE_FROM_CART} from "../constants/actions";

const initialState = {
    items:[],
    quantity:{total:0}
}

  

const cartReducer = (state = initialState, action) => {
    switch (action.type) {
        case ADD_TO_CART:
            {
                let newState={...state};
                const itemExists=newState.items.find((item) => (item.id===action.payload.id && item.size===action.payload.size));
                const amount=(Number)(action.payload.amount);
                if(!itemExists){
                    newState.items.push(action.payload);
                    newState.quantity.total= (Number)(newState.quantity.total)+amount;
                }
                else{

                    itemExists.amount= (Number)(itemExists.amount) + amount;
                    newState.quantity.total= (Number)(newState.quantity.total)+amount;
                }
                return newState;
            }

        case INCREASE_AMOUNT:
            {
                let newState={...state};
                newState.items = [...newState.items];                
                const itemExists=newState.items.find((item) => (item.id===action.payload.id && item.size===action.payload.size));
                if(itemExists){
                    itemExists.amount= (Number)(itemExists.amount)+1;
                    newState.quantity.total+=1;
                    return newState;
                }
                else{
                   return state;
                }
            }

        case DECREASE_AMOUNT:
            {
                let newState={...state};
                newState.items = [...newState.items]; 
                const itemExists=newState.items.find((item) => (item.id===action.payload.id && item.size===action.payload.size));
                if(itemExists){
                    itemExists.amount= (Number)(itemExists.amount)-1;
                    newState.quantity.total-=1;
                    return newState;
                }
                else{
                    return state;
                }
            }

        case REMOVE_FROM_CART:
            {
                let newState={...state};
                const itemExists=newState.items.find((item) => (item.id===action.payload.id && item.size===action.payload.size));
                if(itemExists){
                    newState.items = newState.items.filter (item => {return((item.id!==action.payload.id) || (item.size!==action.payload.size))});
                    newState.quantity.total-=itemExists.amount;
                    if(newState.quantity.total<0){
                        newState.quantity.total=0;
                    }
                }

                return {...newState};

            }

        default:
            return state
    }
}

export default cartReducer;
