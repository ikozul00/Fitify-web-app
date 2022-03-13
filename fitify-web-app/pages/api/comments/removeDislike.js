import clientPromise from "lib/mongodb";
import { ObjectId } from "mongodb";

export default async function (req, res) {
    let client = await clientPromise;
    const comments = client.db().collection('comments');
    const result = await comments.updateOne({_id:ObjectId(req.query.id)},
    { $inc:{
        dislikes: -1
    }
    });
    if(result.modifiedCount==1){
        // client.close();
        res.status(200).json({ message:"Disliked successfully." });
    }
    else{
        // client.close();
        res.status(405).json({ message:"Operation is not allowed." });
    }

}