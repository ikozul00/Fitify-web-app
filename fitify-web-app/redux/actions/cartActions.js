import { ADD_TO_CART, DECREASE_AMOUNT, INCREASE_AMOUNT, REMOVE_FROM_CART, REMOVE_ALL } from "../constants/actions";
export const addToCart = (id,title,image,price,size,amount) => (dispatch) => {
    dispatch({
        type: ADD_TO_CART,
        payload:{
            id:id,
            title:title,
            image:image,
            price:price,
            size:size,
            amount:amount
        },
        
    })
}

export const increaseAmount = (id,size) => (dispatch) => {
    dispatch({
        type: INCREASE_AMOUNT,
        payload:{
            id:id,
            size:size,
        }
    })
}

export const decreaseAmount = (id,size) => (dispatch) => {
    dispatch({
        type: DECREASE_AMOUNT,
        payload:{
            id:id,
            size:size,
        }
    })
}

export const removeFromCart = (id,size) => (dispatch) => {
    dispatch({
        type: REMOVE_FROM_CART,
        payload:{
            id:id,
            size:size,
        }
    })
}

export const removeAllFromCart = () => (dispatch) => {
    dispatch({
        type: REMOVE_ALL
    })
}