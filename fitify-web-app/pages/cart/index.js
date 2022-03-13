import { connect } from "react-redux";
import {
  decreaseAmount,
  increaseAmount,
  removeFromCart,
} from "redux/actions/cartActions";
import TotalContainer from "@/components/cart/totalContainer";
import Product from "../../components/cart/product";

const Cart = ({ items, increaseAmount, decreaseAmount, removeItem, quantity }) => {
  return (
    <>
      <div className="font-open-sans w-full flex sm:flex-row flex-col justify-around">
        <div className="sm:hidden block">
          <TotalContainer items={items} mobile={true} />
        </div>
        <section className=" md:w-7/12 sm:w-8/12 w-11/12 sm:mx-0 mx-auto sm:mb-14 mb-6">
          <h1 className="md:text-5xl sm:text-4xl text-3xl  uppercase mt-12 text-gray-700 font-semibold mb-16">
            Shopping Cart
          </h1>
          {items.length === 0 && (
            <p className="text-lg font-semibold">Shopping cart is empty.</p>
          )}
          {items.map((item) => {
            if(item){
            return(
            <Product
              key={item.id+item.size}
              item={item}
              decreaseAmount={decreaseAmount}
              increaseAmount={increaseAmount}
              removeItem={removeItem}
            />
          )}})}
        </section>
        <TotalContainer items={items} mobile={false} />
      </div>
    </>
  );
};


const mapStateToProps = (state) => ({
  items: state.cartReducer.items,
  quantity:state.cartReducer.quantity.total
});

const mapDispatchToProps = (dispatch) => ({
  increaseAmount: (id, size) => dispatch(increaseAmount(id, size)),
  decreaseAmount: (id, size) => dispatch(decreaseAmount(id, size)),
  removeItem: (id, size) => dispatch(removeFromCart(id, size)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Cart);
