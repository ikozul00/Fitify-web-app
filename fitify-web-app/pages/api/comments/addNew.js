import clientPromise from "lib/mongodb";

export default async function (req, res) {
    let client = await clientPromise;
    const comments = client.db().collection('comments'); 
    const result = await comments.insertOne({
        body:req.body.content,
        product:req.body.product
    });
    console.log(result);
    client.close();
    res.status(201).json({ message: 'User created', ...status });
}