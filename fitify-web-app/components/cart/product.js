import Image from "next/image";
import { useEffect, useState } from "react";
import Link from "next/link";

const Product = ({item, decreaseAmount, increaseAmount, removeItem}) => {
    const [increaseDisabled, setIncreaseDisabled] = useState(false);
    const [decreaseDisabled, setDecreaseDisabled] = useState(false);

    useEffect(() => {
        const decreaseButtonId = `decrease-button-${item.id}${item.size}`;
        const increaseButtonId = `increase-button-${item.id}${item.size}`;
        let decreaseButton = document.getElementById(decreaseButtonId);
        let increaseButton =  document.getElementById(increaseButtonId);
        if(item.amount<=1){
            decreaseButton.disabled=true;
            setDecreaseDisabled(true);
        }
        else if(item.amount>=10){
            increaseButton.disabled=true;
            setIncreaseDisabled(true);
        }
        else{
            increaseButton.disabled=false;
            decreaseButton.disabled=false;
            setDecreaseDisabled(false);
            setIncreaseDisabled(false);
        }
    },[item.amount]);

    return(
        <div className="border-2 border-fitify-green my-5 w-full flex">
        <Link href={`/shop/product/${item.id}`} passHref>
        <div className=" w-56 h-56 relative hover:cursor-pointer">
        <Image
                src={item.image.url}
                alt={`Product ${item.title} image`}
                layout="fill"
                objectFit="cover"
        />
        </div>
        </Link>
        <div className=" flex flex-col justify-center ml-10 text-lg w-5/6">
            <Link href={`/shop/product/${item.id}`} passHref><h2 className="font-bold md:text-xl sm:text-lg text-base hover:cursor-pointer">{item.title}</h2></Link>
            <p className="mt-2 sm:text-base text-sm">Size: {item.size}</p>
            <p className="p-0 m-0 flex content-center sm:text-base text-sm"> Amount: 
                <button id={`decrease-button-${item.id}${item.size}`} className={`font-bold bg-fitify-purple mx-2 text-white rounded-2xl px-3 text-center ${!decreaseDisabled ? "hover:scale-105" : ""} disabled:opacity-60`} onClick={() => decreaseAmount(item.id,item.size)} > - </button>  
                {item.amount}  
                <button id={`increase-button-${item.id}${item.size}`} className={`font-bold bg-fitify-purple mx-2 text-white rounded-2xl px-3 text-center ${increaseDisabled ? "hover:scale-105" : ""} disabled:opacity-60`} onClick={()=> increaseAmount(item.id,item.size)}>+</button>
            </p>
            <p className="mt-4 sm:text-base text-sm">Price: <span className="font-bold">${Math.round((item.price*item.amount+Number.EPSILON)*100)/100}</span></p>
            <button className=" bg-fitify-purple text-white py-2 px-2 sm:place-self-end place-self-start mt-3 sm:mr-8 mr-0 sm:text-base text-sm hover:opacity-60" onClick={() => removeItem(item.id, item.size)}>Remove</button>
        </div>
        </div>
    );
}

export default Product;