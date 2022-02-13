import Image from "next/image";
import { useEffect } from "react";
import Link from "next/link";

const Product = ({item, decreaseAmount, increaseAmount, removeItem}) => {

    useEffect(() => {
        const decreaseButtonId = `decrease-button-${item.id}${item.size}`;
        const increaseButtonId = `increase-button-${item.id}${item.size}`;
        let decreaseButton = document.getElementById(decreaseButtonId);
        let increaseButton =  document.getElementById(increaseButtonId);
        if(item.amount<=1){
            decreaseButton.disabled=true;
        }
        else if(item.amount>=10){
            increaseButton.disabled=true;
        }
        else{
            increaseButton.disabled=false;
            decreaseButton.disabled=false;
        }
    },[item.amount]);

    return(
        <div className="border-2 border-fitify-green my-5 w-full flex">
        <Link href={`/shop/product/${item.id}`}>
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
            <Link href={`/shop/product/${item.id}`}><h2 className="font-bold text-xl hover:cursor-pointer">{item.title}</h2></Link>
            <p className="mt-2">Size: {item.size}</p>
            <p className="p-0 m-0 flex content-center"> Amount: 
                <button id={`decrease-button-${item.id}${item.size}`} className="font-bold bg-fitify-purple mx-2 text-white rounded-2xl px-3 text-center hover:scale-105 disabled:opacity-60" onClick={() => decreaseAmount(item.id,item.size)} > - </button>  
                {item.amount}  
                <button id={`increase-button-${item.id}${item.size}`} className="font-bold bg-fitify-purple mx-2 text-white rounded-2xl px-3 text-center hover:scale-105 disabled:opacity-60" onClick={()=> increaseAmount(item.id,item.size)}>+</button>
            </p>
            <p className="mt-4">Price: <span className="font-bold">${Math.round((item.price*item.amount+Number.EPSILON)*100)/100}</span></p>
            <button className=" bg-fitify-purple text-white py-2 px-2 place-self-end mr-8 hover:opacity-60" onClick={() => removeItem(item.id, item.size)}>Remove</button>
        </div>
        </div>
    );
}

export default Product;