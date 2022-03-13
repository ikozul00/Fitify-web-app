import clientPromise from "lib/mongodb";

export default async function (req, res) {
    let client = await clientPromise;
    const users = client.db().collection('users'); 
    const result = await users.findOne({
        name: req.body.name,
        email: req.body.email,
        credentials:req.body.credentials
    });
    if (!result) {
        // client.close();
        res.status(404).json({message:"User not found!"});
    }
    else{
        let user={
            name:result.name, 
            email:result.email,
            firstName: result.firstName, 
            lastName:result.lastName, 
            phone: result.phone, 
            address:result.address,
            city:result.city,
            country:result.country,
            image:result.image,
            id:result._id
         }
        // client.close();
        res.status(200).json({ data: user });
    } 
  }