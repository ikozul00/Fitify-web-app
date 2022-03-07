import clientPromise from "lib/mongodb";

export default async function (req, res) {
    let client = await clientPromise;
    const commentsCollection = client.db().collection('comments'); 
    const results = await commentsCollection.find({productId:req.query.id});
    let comments=[];
    await results.forEach((comment) => 
    comments.push(comment)
    );
    if (comments.length===0) {
        client.close();
        res.status(404).json({message:"Comments not found!"});
    }
    else{
        client.close();
        res.status(200).json({ comments });
    }
}