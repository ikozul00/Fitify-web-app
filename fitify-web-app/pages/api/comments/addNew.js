import clientPromise from "lib/mongodb";

export default async function (req, res) {
    let client = await clientPromise;
    const comments = client.db().collection('comments');
    const result = await comments.insertOne({
        title:req.body.title,
        content:req.body.content,
        productId:req.body.productId,
        productTitle:req.body.productTitle,
        productBrand:req.body.productBrand,
        imageId:req.body.imageId,
        date:Date(),
        user:req.body.user,
        userName:req.body.userName,
        likes:0,
        dislikes:0
    });
    if(result.insertedId){
        // client.close();
        res.status(201).json({ message: 'Comment created'});
    }
    else{
        // client.close();
        res.status(405).json({ message:"Operation is not allowed." });
    }
    
}