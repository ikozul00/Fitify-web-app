import { useEffect } from "react";

const Payment = ({user, setUser, changeStep}) => {
    useEffect(() => {
        if(!user.payment && !user.card)
            setUser({...user, payment:"cash",card:"Amex"})
    },[]);

    function handleClick(e){
        setUser({...user, payment:e.target.value});
    }

    function changePage(e){
        e.preventDefault();
        changeStep(3);
    }

    return(
        <form className="font-open-sans" className="w-max mx-auto my-10 flex flex-col">
        <p className="text-2xl font-bold mb-5">Please choose payment method:</p>
        <div onChange={(e) => handleClick(e)} className="text-xl mt-3">
        <input type="radio" id="cash" name="payment" value="cash on delivery" defaultChecked/>
        <label htmlFor="cash" className="pl-3"><span className="font-bold">Cash on delivery</span> (Pay in cash when picking up the shipment)</label><br/>
        <input type="radio" id="card" name="payment" value="card"/>
        <label htmlFor="card"className="pl-3"><span className="font-bold">Card</span> (Pay online by credit or debit card)</label>
        </div>
        {(user.payment==="card") && <div className="text-xl mt-4 flex">
        <label htmlFor="cardType" id="cardType">Select card:</label>
        <select
              name="cardType"
              id="cardType"
              className="sm:w-32 w-20 text-center border-2 border-gray-500 text-lg ml-5 mr-10"
              value={user.card}
              onChange={(e) => setUser({...user, card:e.target.value})}
            >
                <option key="Amex" value="Amex">Amex</option>
                <option key="Diners" value="Diners">Diners</option>
                <option key="Discover" value="Discover">Discover</option>
                <option key="Maestro" value="Maestro">Maestro</option>
                <option key="MasterCard" value="MasterCard">MasterCard</option>
                <option key="Visa" value="Visa">Visa</option>
        </select><br/>
        <label htmlFor="cardNumber">Card number:</label>
        <input type="text" id="cardNumber" name="cardNumber" value={user.cardNumber} onChange={(e) => {setUser({...user, cardNumber:e.target.value})}} className="border-2 border-black ml-3"></input>
        </div>}
        <button type="submit" className="bg-fitify-purple sm:px-10 px-0 py-2 font-bold uppercase hover:opacity-80 text-white border-none my-11 sm:w-36 w-24 place-self-end" onClick={(e) => changePage(e)}>Next</button>
        </form>
    );
}

export default Payment;