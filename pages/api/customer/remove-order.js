import clientPromise from '../../../lib/db';
import { getServerSession } from "next-auth/next";
import { authOptions } from "../auth/[...nextauth]";

const handler = async (req, res) => {

  const API_NAME = "Remove Order API";
  console.log(API_NAME);
  
  if (req.method !== 'DELETE') {
    res.setHeader('Allow', ['DELETE']);
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
  const  {orderId} = req.query

  if (!orderId) {
    console.log(API_NAME, 'Order ID is required');
    return res.status(400).json({ message: 'Order ID is required' });
  }

  try {
    // Find the user by their email and remove the order with the matching orderId from the Orders array
    const filter = { email: userEmail };
    const updateDoc = {  $pull: { Orders: { orderId } }};

    const result = await users.updateOne(filter, updateDoc);

    if (result.modifiedCount >= 1) {
      console.log("Order removed successfully");
      return res.status(200).json({ message: 'Order removed successfully' });
    } else {
      console.log("Order not found or no changes made");
      return res.status(404).json({ message: 'Order not found or no changes made' });
    }
  } 
  catch (error) {
    console.error(API_NAME, 'Error removing order:', error);
    return res.status(500).json({ message: 'Error removing order', error });
  }
};

export default handler;
