import clientPromise from '../../lib/db';
import { getServerSession } from "next-auth/next";
import { authOptions } from '../api/auth/[...nextauth]'

const handler = async (req, res) => {
  const API_NAME = "UPDATE USER VENDOR INFO ";

  console.log(API_NAME);

  if (req.method !== 'POST') {
    res.setHeader('Allow', ['POST']);
    console.log(`Method ${req.method} Not Allowed`);
    return res.status(405).end(`Method ${req.method} Not Allowed`);
  }

  const session = await getServerSession(req, res, authOptions);

  if (!session) {
    console.log(API_NAME, 'Unauthorized');
    return res.status(401).json({ message: 'Unauthorized' });
  }

  const client = await clientPromise;
  const userEmail = session.user.email;
  const database = client.db('my-made');
  const users = database.collection('users');
  const { BussniseName, price, description ,phone } = req.body;

  try {
    // Find the user by their email and update their vendor information
    const filter = { email: userEmail };
    const updateDoc = {
      $set: {
        "Vendor.BussniseName": BussniseName,
        "Vendor.price": price,
        "Vendor.description": description,
        "Vendor.phone":phone,
        'Vendor.isVendor': true, // on saving to db 
        'Vendor.Orders':[]
      }
    };

    const result = await users.updateOne(filter, updateDoc);

    if (result.modifiedCount >= 1) {
      console.log("Vendor Info Updated");
      return res.status(200).json({ message: 'Vendor profile updated successfully' });
    } else {
      console.log("User not found or no changes made");
      return res.status(200).json({ message: 'User not found or no changes made' });
    }
  } catch (error) {
    console.error(API_NAME, 'Error updating vendor profile:', error);
    return res.status(500).json({ message: 'Error updating vendor profile', error });
  } 
};

export default handler;
