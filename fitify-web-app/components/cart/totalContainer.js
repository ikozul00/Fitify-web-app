import { useEffect, useState} from "react";
import { useRouter } from "next/router";

const TotalContainer = ({items}) => {
    const [totalPrice, setTotalPrice] = useState(0);
    const [total, setTotal] = useState(0);
    const router=useRouter();

    useEffect(()=> {
        let price=0;
        items.forEach(item => { price= price +Math.round((item.price*item.amount+Number.EPSILON)*100)/100});
        setTotalPrice(price);
        setTotal(price+2);
    },[items]);

    const Buy = (e) => {
        e.preventDefault();
        router.push("/errorPage");
    }

    return(
        <section className="font-open-sans border-4 border-fitify-green h-min px-7 py-4 mt-12 text-xl">
            <p>Total price: ${totalPrice}</p>
            <p>Delivery: $2.0</p>
            <hr className="border-2 border-solid border-fitify-green my-2 bg-fitify-green"></hr>
            <p className="text-2xl font-bold">TOTAL: ${total}</p>
            <button className="mx-auto w-48 my-5 py-2 bg-red-600 font-bold hover:opacity-70" onClick = {(e) => Buy(e)}>BUY</button>
        </section>
    );
}

export default TotalContainer;