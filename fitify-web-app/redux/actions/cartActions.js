import { ADD_TO_CART } from "../constants/actions";

export const addToCart = (title,image,price,size) => (dispatch) => {
    dispatch({
        type: ADD_TO_CART,
        payload:{
            title:title,
            image:image,
            price:price,
            size:size
        }
    })
}
