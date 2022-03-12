import clientPromise from "lib/mongodb";
import { ObjectId } from "mongodb";

export default async function (req, res) {
    let client = await clientPromise;
    // console.log(clientPromise);
    console.log("req");
    console.log(req.query);
    const orders=client.db().collection('orders');
    const order = await orders.findOne({
        _id: ObjectId(req.query.id)
    });
    console.log(order);
    if(!order){
        client.close();
        res.status(404).json({message:"Order not found!"});
    }
    else{
        order.total=0;
        order.items.forEach(item => { order.total= (Number)(order.total) +Math.round((item.price*item.amount+Number.EPSILON)*100)/100});
        client.close();
        res.status(200).json({ order });
    }
}