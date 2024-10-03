import clientPromise from '../../../lib/db';
import { getServerSession } from "next-auth/next";
import { authOptions } from "../auth/[...nextauth]";
import { v4 as uuidv4 } from 'uuid'; // Import UUID

const handler = async (req, res) => {

  const API_NAME = "Save Orders API ";

  console.log(API_NAME);
  console.log(req.body);

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

  const {  
    orderPhone,
    addres, 
    ApartmentRoomsNumber,
    NumberOfBaths,
    ResurveDate,
    orderPrice, 
    JobDescription,
    city,
    ApartmentSize

  } = req.body;

  try {

    const newOrder = {
      orderPhone,  
      addres,
      ApartmentRoomsNumber,
      ResurveDate,
      JobDescription,
      city,
      NumberOfBaths,
      orderPrice,
      createdAt: new Date()  ,
      orderId: uuidv4(), 
      orderStatus:"Open", // this will be toogel by Vendor to | padding | close 
      ApartmentSize
    };

    // Find the user by their email and push the new order into the Orders array
    const filter = { email: userEmail };
    const updateDoc = {
      $push: { Orders: newOrder } 
    };

    const result = await users.updateOne(filter, updateDoc);

    if (result.modifiedCount >= 1) {
       console.log("Order added successfully");
      return res.status(200).json({ message: 'Order added successfully' });
    } else {
      console.log("User not found or no changes made");
      return res.status(200).json({ message: 'User not found or no changes made' });
    }
  } catch (error) {
    console.error(API_NAME, 'Error adding order:', error);
    return res.status(500).json({ message: 'Error adding order', error });
  }
};

export default handler;
