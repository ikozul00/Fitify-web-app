import { connect } from "react-redux";
import { useState, useEffect } from "react";
import { removeAllFromCart } from "redux/actions/cartActions";

const Success = ({user, items, removeAll})=> {
    const [totalPrice, setTotalPrice] = useState(0);
    const [ordered, setOrdered] = useState(false);
    const [error, setError] = useState("");

    useEffect(()=> {
        let price=0;
        items.forEach(item => { price= price +Math.round((item.price*item.amount+Number.EPSILON)*100)/100});
        setTotalPrice(Math.round((price+Number.EPSILON)*100)/100);
    },[items]);

    async function placeOrder(){
        const res = await fetch("/api/placeOrder", {
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
        {!ordered && <section>
            <h2>Order info</h2>
            <div>
            <p>First name: {user.firstName}</p>
            <p>Last name: {user.lastName}</p>
            <p>Phone number: {user.phone}</p>
            <p>Address: {user.address}</p>
            <p>City: {user.city}</p>
            <p>Country: {user.country}</p>
            </div>
            <div>
                <p>Payment method: {user.payment}</p>
                {(user.payment==="card") && <p>Card: {user.card}</p>}
                {(user.payment==="card") && <p>Card number: {user.cardNumber}</p>}
            </div>
            <div>
                <p>Items:</p>
                {items.map((item) => {
                    return(
                        <p key={`${item.id}+${item.size}`}><span>{item.amount}X </span><span>{item.title}</span> <span>{item.price}</span></p>
                    )
                })}
                <p>Total price: {totalPrice+2}</p>
            </div>
            <button className="bg-fitify-purple" onClick={() => placeOrder()}>Buy</button>
            {error && <p>{error}</p>}
        </section>}
        {ordered && <secion>
            <p>Successfully placed order.</p>
        </secion>}
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