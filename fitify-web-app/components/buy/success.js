import { connect } from "react-redux";
import { useState, useEffect } from "react";
import { removeAllFromCart } from "redux/actions/cartActions";
import { BsCheckCircle } from "react-icons/bs";

const Success = ({user, items, removeAll, ordered, setOrdered})=> {
    const [totalPrice, setTotalPrice] = useState(0);
    const [error, setError] = useState("");

    useEffect(()=> {
        let price=0;
        items=items.filter((item)=> item!=null);
        items.forEach(item => { price= price +Math.round((item.price*item.amount+Number.EPSILON)*100)/100});
        setTotalPrice(Math.round((price+Number.EPSILON)*100)/100);
    },[items]);

    async function placeOrder(){
        const res = await fetch("/api/orders/placeOrder", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json;charset=utf-8'
            },
            body: JSON.stringify({...user, items:items,price:totalPrice+2})
        });
        if(res.status===201){
            removeAll();
            setOrdered(true);
        }
        else{
            setError("There has been a problem please try again latter!");
        }
    }

    return(
        <>
        {!ordered && 
        <section className="w-8/12 mx-auto flex flex-col">
            <h2 className="text-2xl font-bold text-center">Order info</h2>
            <div className="flex justify-between mt-5">
            <div >
            <p className="my-1"><span className="font-semibold">First name:</span> {user.firstName}</p>
            <p className="my-1"><span className="font-semibold">Last name:</span> {user.lastName}</p>
            <p className="my-1"><span className="font-semibold">Phone number:</span> {user.phone}</p>
            <p className="my-1"><span className="font-semibold">Address:</span> {user.address}</p>
            <p className="my-1"><span className="font-semibold">City:</span> {user.city}</p>
            <p className="my-1"><span className="font-semibold">Country:</span> {user.country}</p>
            </div>
            <div>
                <p className="my-1"><span className="font-semibold">Payment method:</span> {user.payment}</p>
                {(user.payment==="card") && <p className="my-1"><span className="font-semibold">Card:</span> {user.card}</p>}
                {(user.payment==="card") && <p className="my-1"><span className="font-semibold">Card number:</span> {user.cardNumber}</p>}
            </div>
            <div>
                <p className="font-bold">Items:</p>
                {items.map((item) => {
                    if(item){
                    return(
                        <p key={`${item.id}+${item.size}`} className="mx-2"><span className="mr-4 font-semibold">{item.amount}X </span><span>{item.title}</span> <span className="font-semibold">${item.price}</span></p>
                    )}
                })}
                <p className="font-bold text-xl mt-5">Total price: ${totalPrice+2}</p>
            </div>
            </div>
            <button className="bg-fitify-pink sm:px-10 px-0 py-2 font-bold uppercase hover:opacity-80 text-white border-none my-11 sm:w-36 w-24 place-self-end" onClick={() => placeOrder()}>Buy</button>
            {error && <p>{error}</p>}
        </section>}
        {ordered && 
        <section className="w-8/12 mx-auto my-10 flex flex-col items-center">
            <BsCheckCircle className="text-7xl text-fitify-green mb-5"/>
            <p className="font-bold text-3xl text-center">Successfully placed order.</p>

        </section>}
        </>
    );
}

const mapStateToProps = (state) => ({
    items: state.cartReducer.items,
});

const mapDispatchToProps = (dispatch) => ({
    removeAll: () => dispatch(removeAllFromCart()),
  });

export default connect(mapStateToProps, mapDispatchToProps)(Success);