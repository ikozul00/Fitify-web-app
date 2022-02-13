import { useEffect, useState} from "react";
import { useRouter } from "next/router";

const TotalContainer = ({items, mobile}) => {
    const [totalPrice, setTotalPrice] = useState(0);
    const [total, setTotal] = useState(0);
    const router=useRouter();

    useEffect(()=> {
        let price=0;
        items.forEach(item => { price= price +Math.round((item.price*item.amount+Number.EPSILON)*100)/100});
        setTotalPrice(Math.round((price+Number.EPSILON)*100)/100);
        setTotal(Math.round((price+2+Number.EPSILON)*100)/100);
    },[items]);

    const Buy = (e) => {
        e.preventDefault();
        router.push("/errorPage");
    }

    return(
        <section className={`font-open-sans sm:block   
        ${mobile ? "flex justify-between border-b-2 items-center w-full " : "sm:mt-12 mt-6 mb-10 border-4 sm:w-auto w-11/12 sm:mx-0 mx-auto flex flex-col justify-center"} 
        border-fitify-green h-min md:px-7 px-4 py-4  md:text-xl sm:text-lg text-xl`}>
            {!mobile && <p>Total price: ${totalPrice}</p>}
            {!mobile && <p>Delivery: $2.0</p>}
            {!mobile && <hr className="border-2 border-solid border-fitify-green my-2 bg-fitify-green"></hr>}
            <p className={`md:text-2xl sm:text-xl text-2xl  font-bold ${!mobile ? "uppercase " : " "}`}>Total: ${total}</p>
            <button className={` md:w-48 w-40 ${mobile ? "my-0" : "my-5 mx-auto"} py-2 bg-fitify-pink text-white font-bold text-2xl ${totalPrice<=0 ? "opacity-50" : "hover:opacity-70"} `} onClick = {(e) => Buy(e)}>BUY</button>
        </section>
    );
}

export default TotalContainer;