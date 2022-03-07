import clientPromise from "lib/mongodb";
import { ObjectId } from "mongodb";

export default async function (req, res) {
    let client = await clientPromise;
    const users = client.db().collection('users');
    const user = req.body;
    const result = await users.updateOne({_id:ObjectId(req.body.id)},
    { $set:{
        name: user.name,
        firstName:user.firstName,
        lastName:user.lastName,
        email:user.email,
        city:user.city,
        country:user.country,
        address:user.address,
        phone:user.phone
    }
    });
    if(result.modifiedCount==1){
        res.status(200).json({ message:"Updated successfully." });
    }
    else{
        res.status(405).json({ message:"Operation is not allowed." });
    }

}