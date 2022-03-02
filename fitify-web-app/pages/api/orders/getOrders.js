import clientPromise from "lib/mongodb";

export default async function (req, res) {
    let userOrders=[];
    let client = await clientPromise;
    const orders=client.db().collection('orders');
    const results = await orders.find({
        id:req.query.id
    });
     await results.forEach((order) => userOrders.push({
        items:order.items,
        price:order.price,
        date:order.date,
        id:order._id
    }));
    if (userOrders.length===0) {
        client.close();
        res.status(404).json({message:"Orders not found!"});
    }
    else{
        client.close();
        res.status(200).json({ userOrders });
    }
}