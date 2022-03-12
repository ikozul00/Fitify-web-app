import clientPromise from "lib/mongodb";
import { deleteAsset } from "pages/api/deleteAsset";

export default async function (req, res) {
    console.log("evo");
    let client = await clientPromise;
    console.log(clientPromise);
    const comments = client.db().collection('comments');
    let allComments=comments.find({productId:req.query.id});
    await allComments.forEach(async (comment) =>{
        console.log(comment.imageId);
        let success= await deleteAsset(comment.imageId);
        if(success!=0){
            res.status(405).json({ message:"Operation is not allowed." });
        }
    }
    );
    const result = await comments.deleteMany({
        productId: req.query.id
    });
    if(result){
        client.close();
        res.status(200).json({ message: 'Comments deleted'});
    }
    else{
        client.close();
        res.status(405).json({ message:"Operation is not allowed." });
    }
    
}