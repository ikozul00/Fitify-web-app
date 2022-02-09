import { connect} from "react-redux";
import Image from "next/image";
import { decreaseAmount, increaseAmount, removeFromCart } from "redux/actions/cartActions";

const Cart = ({items, increaseAmount, decreaseAmount, removeItem}) => {
    console.log(items);
    return(
        <>
            <div className="font-open-sans">
               <h1 className="text-5xl uppercase mt-12 text-gray-700 font-semibold">Shopping Cart</h1> 
               {items.map((item)=>{
                   return(
                       <div className="border-2 border-black my-5 w-2/3">
                           <div className=" w-80 h-80 relative">
                           <Image
                                 src={item.image.url}
                                 alt={`Product ${item.title} image`}
                                 layout="fill"
                                 objectFit="cover"
                           />
                           </div>
                            <h2>{item.title}</h2>
                            <p>Price: ${item.price}</p>
                            <p>Size: {item.size}</p>
                            <p> Amount: <button className="text-3xl font-bold" onClick={() => decreaseAmount(item.id,item.size)} >-</button>  {item.amount}  <button className="text-3xl font-bold" onClick={()=> increaseAmount(item.id,item.size)}>+</button></p>
                            <button className="bg-red" onClick={() => removeItem(item.id, item.size)}>Remove</button>
                        </div>
                    
                    );})}
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
