// pages/api/user.js
import clientPromise from '@/lib/db';
import { getServerSession } from "next-auth/next"
import { authOptions } from "./auth/[...nextauth]"


export default async function handler(req, res) {

  try {
    
    const session = await getServerSession(req, res, authOptions)

    const client = await clientPromise;
    const database = client.db('my-made');
    const users = database.collection('users');

    if (req.method === 'GET') {
      // Fetch user profile
      const user = await users.findOne({ email: session.user.email });

        if (!user) {
           res.status(404).json({ message: 'User not found' });
        } 
           
         res.status(200).json(user);
      
      } 

    else if (req.method === 'POST') {
       // Save/update user profile
        const { email, age, phone, about } = req.body;
        const result = await users.updateOne(
        { email: email },
        { $set: { age, phone, about } },
        { upsert: true }
      );

      res.status(200).json({ message: 'Profile updated successfully' });
    } 
    else {
      res.setHeader('Allow', ['GET', 'POST']);
      res.status(405).end(`Method ${req.method} Not Allowed`);
    }
  } catch (error) {
     console.error('Error interacting with MongoDB:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
}
