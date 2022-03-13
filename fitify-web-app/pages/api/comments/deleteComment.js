import clientPromise from "lib/mongodb";
import { ObjectId } from "mongodb";

export default async function (req, res) {
    let client = await clientPromise;
    const comments = client.db().collection('comments');
    const result = await comments.deleteOne({
        _id: ObjectId(req.query.id)
    });
    if(result.deletedCount===1){
        // client.close();
        res.status(200).json({ message: 'Comment deleted'});
    }
    else{
        // client.close();
        res.status(405).json({ message:"Operation is not allowed." });
    }
    
}