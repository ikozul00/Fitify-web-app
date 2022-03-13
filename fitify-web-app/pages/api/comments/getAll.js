import clientPromise from "lib/mongodb";

export default async function (req, res) {
    let client = await clientPromise;
    console.log(clientPromise);
    const commentsCollection = client.db().collection('comments'); 
    const results = await commentsCollection.find({productId:req.query.id});
    let comments=[];
    await results.forEach((comment) => 
    comments.push(comment)
    );
    client.close();
    if (!comments) { 
        res.status(404).json({message:"Comments not found!"});
    }
    else{
        res.status(200).json({ comments });
    }
}