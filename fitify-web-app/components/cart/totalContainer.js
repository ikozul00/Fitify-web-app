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
        if(!(totalPrice<=0)){
            router.push("/errorPage");
        }
        
    }

    return(
        <section className={`font-open-sans sm:block   
        ${mobile ? "flex justify-between border-b-2 items-center w-full " : "sm:mt-12 mt-6 mb-10 border-4 sm:w-auto w-11/12 sm:mx-0 mx-auto flex flex-col justify-center"} 
        border-fitify-green h-min md:px-7 px-4 py-4  md:text-xl sm:text-lg text-base`}>
            {!mobile && <p>Total price: ${totalPrice}</p>}
            {!mobile && <p>Delivery: $2.0</p>}
            {!mobile && <hr className="border-2 border-solid border-fitify-green my-2 bg-fitify-green"></hr>}
            <p className={`md:text-2xl sm:text-xl text-lg  font-bold ${!mobile ? "uppercase " : " "}`}>Total: ${total}</p>
            <button className={` md:w-48 sm:w-40 w-36 ${mobile ? "my-0" : "my-5 mx-auto"} py-2 bg-fitify-pink text-white font-bold sm:text-2xl text-xl ${totalPrice<=0 ? "opacity-50 hover:cursor-default" : "hover:opacity-70 hover:cursor-pointer"} `} onClick = {(e) => Buy(e)}>BUY</button>
        </section>
    );
}

export default TotalContainer;