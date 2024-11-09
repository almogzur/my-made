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
  const areaDatabase = client.db('my-made-Areas');
  const users = database.collection('users');
  const { id } = req.query;

  if (!id) {
    console.log(API_NAME, 'Order ID is required');
    return res.status(400).json({ message: 'Order ID is required' });
  }

  try {
    // Step 1: Retrieve the order to find the corresponding city
    const user = await users.findOne({ email: userEmail, "Profile_Orders._id": id }, { projection: { "Profile_Orders.$": 1 } });
    const order = user?.Profile_Orders?.[0];

    if (!order) {
      console.log("Order not found in user's profile");
      return res.status(404).json({ message: 'Order not found' });
    }

    const city = order.city;  
    const cityCollection = areaDatabase.collection(city);

    // Step 2: Remove the order from the user's `Profile_Orders`

    const updateDoc = { $pull: { 'Profile_Orders': { _id: id } } };
    const userResult = await users.updateOne({ email: userEmail }, updateDoc);

    if (userResult.modifiedCount === 1) {
      console.log("Order removed from user's profile");

      // Step 3: Remove the order from the corresponding city collection
      const cityResult = await cityCollection.deleteOne({ "_id": id });

      if (cityResult.deletedCount === 1) {
        console.log("Order removed from city collection");
        return res.status(200).json({ message: 'Order removed successfully from both user and city collection' });
      }   else {
        console.log("Order not found in city collection");
        return res.status(404).json({ message: 'Order not found in city collection' });
      }
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
