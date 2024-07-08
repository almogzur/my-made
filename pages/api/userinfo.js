// pages/api/user/profile.js
import clientPromise from '@/lib/db';
import { getServerSession } from "next-auth/next";
import { authOptions } from "./auth/[...nextauth]";

const handler = async (req, res) => {


  console.log("SAVE USER INFO API");

  if (req.method !== 'POST') {
    res.setHeader('Allow', ['POST']);
    console.log(`Method ${req.method} Not Allowed`);
    return res.status(405).end(`Method ${req.method} Not Allowed`);
  }

  const session = await getServerSession(req, res, authOptions);

  if (!session) {
    console.log('Unauthorized');
    return res.status(401).json({ message: 'Unauthorized' });
  }

  const client = await clientPromise;


  const userEmail = session.user.email;
  const database = client.db('my-made');
  const users = database.collection('users');

  try {
    // Find the user by their email and update their information
    const filter = { email: userEmail };
    const updateDoc = {
      $set: {
        age: req.body.age,
        phone: req.body.phone,
        about: req.body.about
      }
    };

    const result = await users.updateOne(filter, updateDoc);

    if (result.modifiedCount === 1) {
      console.log("User Info Updated");
      return res.status(200).json({ message: 'Profile updated successfully' });
    } else {
      console.log("User not found or no changes made");
      return res.status(404).json({ message: 'User not found or no changes made' });
    }
  } catch (error) {
    console.error('Error updating profile:', error);
    return res.status(500).json({ message: 'Error updating profile', error });
  } finally {
    // Close the database connection
  }
}

export default handler;
