// pages/api/save-user-to-db.ts
import clientPromise from '../../lib/db';
import { getServerSession } from "next-auth/next";
import { authOptions } from '../api/auth/[...nextauth]'

export default async function handler(req, res) {

  console.log("SAVE STATE API INVOKE");

  if (req.method !== 'POST') {
    res.setHeader('Allow', ['POST']);
    console.log(`Method ${req.method} Not Allowed`);
    return res.status(405).end(`Method ${req.method} Not Allowed`);
  }

  const session = await getServerSession(req, res, authOptions);

  if (!session) {
    console.log('message: Unauthorized')
    return res.status(401).json({ message: 'Unauthorized' });
  }

  const state = req.body;

  if (!state) {
    console.log("No State");
    return res.status(400).json({ message: 'No State' });
  }

  try {
    const client = await clientPromise;
    const database = client.db('my-made');
    const users = database.collection('users');

    console.log("SaveState Looking For User ");
    const existingUser = await users.findOne({ email: session.user.email });

    if (existingUser && existingUser.state) {
      console.log("User Already Has State in Db");
      return res.status(200).json({
        message: 'State already exists',
      });
    }

    const result = await users.updateOne(
      { email: session.user.email },
      { $set: { state } },
      { upsert: true } // Using upsert to create the document if it does not exist
    );
    
    console.log("Save Api Successful ");
    return res.status(200).json({ message: 'Profile updated successfully', result });
  } catch (error) {
    console.log(error);
    console.error('Error updating user:', error);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
}
