import clientPromise from '../../../lib/db';
import { getServerSession } from "next-auth/next";
import { authOptions } from "../auth/[...nextauth]";
import { v4 as uuidv4 } from 'uuid';

const handler = async (req, res) => {

  const API_NAME = "Save Orders API ";


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
  const database = client.db('my-made');
  const areadatabase = client.db("my-made-Areas");

  const userEmail = session.user.email;


  try {

    const usersCollection = database.collection('users');

    // Find user by email to get their _id
    const user = await usersCollection.findOne({ email: userEmail });
    if (!user) {
      console.log("User not found");
      return res.status(404).json({ message: 'User not found' });
    }

    const userId = user._id; 
    const name = session.user.name

    

    const newOrder = {
        name,
        status: "Open",
      ...req.body,
       createdAt: new Date(),
       _id: uuidv4(),
       ownerId: userId, 
    };

    // Add the order to the user's Orders array
    const updateUser = { $push: { Profile_Orders: newOrder } };

    const userResult = await usersCollection.updateOne({ email: userEmail }, updateUser);

    const areaCollection = areadatabase.collection(req.body.city);

    const addOrderToArea = await areaCollection.insertOne(newOrder);

    if (userResult.acknowledged  && addOrderToArea.acknowledged) {
        console.log("Order added successfully");
      return res.status(200).json({ message: 'Order added successfully' });
    } else {
      console.log(userResult,addOrderToArea );
      return res.status(200).json({ message: 'User not found or no changes made' });
    }
  } catch (error) {
    console.error(API_NAME, 'Error adding order:', error);
    return res.status(500).json({ message: 'Error adding order', error });
  }
};

export default handler;
