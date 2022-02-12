import { connect} from "react-redux";
import Image from "next/image";
import { decreaseAmount, increaseAmount, removeFromCart } from "redux/actions/cartActions";
import TotalContainer from "@/components/cart/totalContainer";
import Product from "../../components/cart/product";

const Cart = ({items, increaseAmount, decreaseAmount, removeItem}) => {
    return(
        <>
            <div className="font-open-sans w-full flex justify-around">
                <section className=" w-7/12 mb-14">
                    <h1 className="text-5xl uppercase mt-12 text-gray-700 font-semibold mb-16">Shopping Cart</h1> 
                    {(items.length === 0) && <p className="text-lg font-semibold">Shopping cart is empty.</p> }
                    {items.map((item)=>
                            <Product item = {item} decreaseAmount = {decreaseAmount} increaseAmount = {increaseAmount} removeItem = {removeItem}/>)}
                </section>
                <TotalContainer items={items}/>
            </div>

        
        </>
    );
}

const mapStateToProps = (state) => ({
    items:state.cartReducer.items,
});

const mapDispatchToProps = (dispatch) => ({ 
    increaseAmount: (id,size) => dispatch(increaseAmount(id,size)),
    decreaseAmount: (id, size) => dispatch(decreaseAmount(id,size)),
    removeItem: (id, size) => dispatch(removeFromCart(id,size)),
  });

export default connect(mapStateToProps, mapDispatchToProps)(Cart); 
