import Image from "next/image";
import { useEffect } from "react";

const Product = ({item, decreaseAmount, increaseAmount, removeItem}) => {

    useEffect(() => {
        console.log(item.amount);
        let decreaseButton = document.getElementById("decrease-button");
        let increaseButton =  document.getElementById("increase-button");
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
        <div className=" w-56 h-56 relative">
        <Image
                src={item.image.url}
                alt={`Product ${item.title} image`}
                layout="fill"
                objectFit="cover"
        />
        </div>
        <div className=" flex flex-col justify-center ml-10 text-lg w-5/6">
            <h2 className="font-bold text-xl">{item.title}</h2>
            <p className="mt-2">Size: {item.size}</p>
            <p className="p-0 m-0 flex content-center"> Amount: 
                <button id="decrease-button" className="font-bold bg-fitify-purple mx-2 text-white rounded-2xl px-3 text-center hover:scale-105 disabled:opacity-60" onClick={() => decreaseAmount(item.id,item.size)} > - </button>  
                {item.amount}  
                <button id="increase-button" className="font-bold bg-fitify-purple mx-2 text-white rounded-2xl px-3 text-center hover:scale-105 disabled:opacity-60" onClick={()=> increaseAmount(item.id,item.size)}>+</button>
            </p>
            <p className="mt-4">Price: <span className="font-bold">${Math.round((item.price*item.amount+Number.EPSILON)*100)/100}</span></p>
            <button className=" bg-fitify-purple text-white py-2 px-2 place-self-end mr-8 hover:opacity-60" onClick={() => removeItem(item.id, item.size)}>Remove</button>
        </div>
        </div>
    );
}

export default Product;