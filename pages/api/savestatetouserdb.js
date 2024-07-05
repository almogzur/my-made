// pages/api/update.js
import clientPromise from '@/lib/db';
import { getServerSession } from "next-auth/next";
import { authOptions } from "./auth/[...nextauth]";

export default async function handler(req, res) {
  console.log("Update Handler invoked");

  if (req.method !== 'POST') {
    res.setHeader('Allow', ['POST']);
    return res.status(405).end(`Method ${req.method} Not Allowed`);
  }

  const session = await getServerSession(req, res, authOptions);
  const state = req.body;

  if (!session) {
    return res.status(401).json({ message: 'Unauthorized' });
  }

  if (!state) {
    return res.status(400).json({ message: 'Invalid input' });
  }

  try {
    const client = await clientPromise;
    const database = client.db('my-made');
    const users = database.collection('users');

    // Check if the state already exists
    const existingUser = await users.findOne({ email: session.user.email });
    if (existingUser && existingUser.state && JSON.stringify(existingUser.state) === JSON.stringify(state)) 
      {
        console.log("user have state object ")
      return res.status(200).json({ message: 'State already saved' ,existingUser});
    }

    // Update user profile
    const result = await users.updateOne(
      { email: session.user.email },
      { $set: { state } }, // Save the state in the database
      { upsert: false }
    );

    return res.status(200).json({ message: 'Profile updated successfully' });
  } 
  catch (error) {
    console.error('Error updating user:', error);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
}
