import clientPromise from '@/lib/db';
import { getServerSession } from "next-auth/next"
import { authOptions } from "./auth/[...nextauth]"

export default async function handler(req, res) {

  try {
    const session = await getServerSession(req, res, authOptions);

    if (!session) {
      return res.status(401).json({ message: 'Unauthorized' });
    }

    const client = await clientPromise;
    const database = client.db('my-made');
    const users = database.collection('users');

    if (req.method === 'GET') {
      // Fetch user profile
      const user = await users.findOne({ email: session.user.email });

      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }

      // Include the state in the response
      const userWithState = { ...user, state: session.state };
      return res.status(200).json(userWithState);

    } 
    
  
    else {
      res.setHeader('Allow', ['GET']);
      return res.status(405).end(`Method ${req.method} Not Allowed`);
    }
   } 
    catch (error) {
    console.error('Error interacting with MongoDB:', error);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
}
 