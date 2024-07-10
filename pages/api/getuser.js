import clientPromise from '@/lib/db';
import { getServerSession } from "next-auth/next";
import { authOptions } from "@pages/api/auth/[...nextauth]";


const API_NAME = "GET USER API";

const handler = async (req, res) => {
  
  console.log(API_NAME);

  if (req.method !== 'GET') {
    res.setHeader('Allow', ['GET']);
    console.log(`Method ${req.method} Not Allowed`);
    return res.status(405).end(`Method ${req.method} Not Allowed`);
  }

  const session = await getServerSession(req, res, authOptions);

  if (!session) {
    console.log('Unauthorized');
    return res.status(401).json({ message: 'Unauthorized' });
  }

  const client = await clientPromise;
  const database = client.db('my-made');
  const users = database.collection('users');

    const query = req.query 
  

  if (Object.keys(query).length <= 0) {
    console.log(API_NAME, 'Quary Objeect is Empty ');
    return res.status(400).json({ message: 'User Email is required' });
  }

  try {
    // Convert sessionId to ObjectId

    // Find the user by their session ID
    const user = await users.findOne(query,{},{});

    console.log(user,"DB USER")
    if (!user) {
      console.log("User not found");
      return res.status(404).json({ message: 'User not found' });
    }

    console.log("User Info Retrieved");
    return res.status(200).json(user);
  } catch (error) {
    console.error('Error retrieving user info:', error);
    return res.status(500).json({ message: 'Error retrieving user info', error });
  }
}

export default handler;
