import clientPromise from "lib/mongodb";

export default async function (req, res) {
    let client = await clientPromise;
    const users = client.db().collection('orders'); 
    const result = await users.insertOne({...(req.body), date:Date()});
    if(result.acknowledged && result.insertedId){
        res.status(201).json({ message: "Success!" });
    }
    else{
        res.status(503).json({message:"Not created!"});
    }
}