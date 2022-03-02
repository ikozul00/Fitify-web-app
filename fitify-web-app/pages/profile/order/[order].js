import { useEffect } from "react";
import React from "react";

const Order = ({ data }) => {

    return(
        <section className="w-8/12 mx-auto flex flex-col">
            <h2 className="text-2xl font-bold text-center">Order info</h2>
            <div className="flex justify-between mt-5">
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
            <div>
                <p className="font-bold">Items:</p>
                {data.items.map((item) => {
                    return(
                        <p key={`${item.id}+${item.size}`} className="mx-2"><span className="mr-4 font-semibold">{item.amount}X </span><span>{item.title}</span> <span className="font-semibold">${item.price}</span></p>
                    )
                })}
                <p className="font-bold text-xl mt-5">Total price: ${data.total+2}</p>
            </div>
            </div>
        </section>
    )
}

export async function getStaticPaths() {
    const res = await fetch(`http://localhost:3000/api/orders/getOrdersIds`);
    let paths={};
    if(res.status===200){
        const ids = await res.json();

        //Uzmu se svi slugovi i iz njih kreiraju pathovi
        paths = ids.ordersIds.map((id) => ({
            params: { order: id.id },
        }));
    }
    else{
        paths={params:{order:0}};
    }

  return {
    paths,
    fallback: false, // Ovim se obvezujemo da smo dali opise svih pathova koje zelimo staticki pregenerirati
  };
}

export async function getStaticProps(context) {
  const { order } = context.params;
  const res = await fetch(`http://localhost:3000/api/orders/getOrder?id=${order}`);
  let orderData={};
  if(res.status===200){
    orderData=await res.json();
    orderData=orderData.order;
  }
  else{
      orderData={};
  }
  return {
    props: { data:orderData },
  };
}

export default Order;
