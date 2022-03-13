import clientPromise from "@/lib/mongodb";
import React from "react";
import Product from "@/components/cart/product";
import { ObjectId } from "mongodb";

const Order = ({ data }) => {

    return(
        <section className="w-8/12 mx-auto flex flex-col my-10 font-open-sans">
            <h2 className="text-3xl text-gray-700 font-bold text-center uppercase">Order info</h2>
            <div className="flex justify-between mt-8">
            <div >
            <p className="my-1"><span className="font-semibold">First name:</span> {data.firstName}</p>
            <p className="my-1"><span className="font-semibold">Last name:</span> {data.lastName}</p>
            <p className="my-1"><span className="font-semibold">Phone number:</span> {data.phone}</p>
            <p className="my-1"><span className="font-semibold">Address:</span> {data.address}</p>
            <p className="my-1"><span className="font-semibold">City:</span> {data.city}</p>
            <p className="my-1"><span className="font-semibold">Country:</span> {data.country}</p>
            </div>
            <div>
                <p className="my-1"><span className="font-semibold">Payment method:</span> {data.payment}</p>
                {(data.payment==="card") && <p className="my-1"><span className="font-semibold">Card:</span> {data.card}</p>}
                {(data.payment==="card") && <p className="my-1"><span className="font-semibold">Card number:</span> {data.cardNumber}</p>}
            </div>
            <p className="font-bold text-xl">Total price: ${data.total+2}</p>
            </div>
            
            <div>
                <p className="font-bold mt-5 text-xl">Items:</p>
                {data.items.map((item) => {
                    if(item){
                    return(
                        <div key={`${item.id}+${item.size}`}>
                        <Product order={true} item={item}/>
                        </div>
                    )}
                })}
            </div>
            
        </section>
    )
}

// export async function getServerSideProps(context) {
//   const { order } = context.params;
//   const res = await fetch(`http://localhost:3000/api/orders/getOrder?id=${order}`);
//   let orderData={};
//   if(res.status===200){
//     orderData=await res.json();
//     orderData=orderData.order;
//   }
//   else{
//       orderData={};
//   }
//   return {
//     props: { data:orderData },
//   };
// }

export async function getServerSideProps(context) {
    const { order } = context.params;
    let client = await clientPromise;
    let orderInfo={};
    const orders=client.db().collection('orders');
    const orderData = await orders.findOne({
        _id: ObjectId(order)
    });
    console.log(orderData);
    if(!orderData){
        orderInfo={};
    }
    else{
        orderData.total=0;
        orderData.items.forEach(item => { orderData.total= (Number)(orderData.total) +Math.round((item.price*item.amount+Number.EPSILON)*100)/100});
        orderInfo={
            ...orderData, _id:`${orderData._id}`,
        };
    }
    return {
        props: { data:orderInfo },
      };
  }
export default Order;
