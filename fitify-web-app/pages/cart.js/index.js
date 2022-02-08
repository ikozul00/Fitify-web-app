import { connect} from "react-redux";

const Cart = ({items}) => {
    return(
        <>
            <div className="font-open-sans">
               <h1 className="text-5xl uppercase mt-12 text-gray-700 font-semibold">Shopping Cart</h1> 
               {console.log(items)}
               {items.map((item)=><p>{item.title}</p>)}
            </div>
        
        </>
    );
}

const mapStateToProps = (state) => ({
    items:state.cartReducer.items,
});

export default connect(mapStateToProps, null)(Cart); 
