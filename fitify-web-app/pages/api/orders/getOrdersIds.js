import clientPromise from "lib/mongodb";

export default async function (req, res) {
    let ordersIds=[];
    let client = await clientPromise;
    const orders=client.db().collection('orders');
    const results = await orders.find();
     await results.forEach((order) => ordersIds.push({
        id:order._id
    }));
    if (ordersIds.length===0) {
        client.close();
        res.status(404).json({message:"Orders not found!"});
    }
    else{
        client.close();
        res.status(200).json({ ordersIds });
    }
}