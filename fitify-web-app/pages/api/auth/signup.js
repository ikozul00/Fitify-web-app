import clientPromise from '../../../lib/mongodb';
import { hash } from 'bcryptjs';

async function handler(req, res) {
    //Only POST mothod is accepted
    if (req.method === 'POST') {
        //Getting email and password from body
        const { name,email, password,firstName,lastName,phone,address,city,country } = req.body;
        //Connect with database
        const client = await clientPromise;
        const db = await client.db();
        //Check existing
        const checkExisting = await db
            .collection('users')
            .findOne({ email: email, name:name, credentials:"credentials" });
        //Send error response if duplicate user is found
        if (checkExisting) {
            res.status(422).json({ message: 'User already exists' });
            client.close();
            return;
        }
        //Hash password
        const status = await db.collection('users').insertOne({
            name,
            email,
            password: await hash(password, 12),
            firstName,
            lastName,
            phone,
            address,
            city,
            country,
            credentials:"credentials",
            role:"user"
        });
        //Send success response
        res.status(201).json({ message: 'User created', ...status });
        //Close DB connection
        client.close();
    } else {
        //Response for other than POST method
        res.status(500).json({ message: 'Route not valid' });
    }
}

export default handler;