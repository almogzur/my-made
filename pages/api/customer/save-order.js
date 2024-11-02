import clientPromise from '../../../lib/db';
import { getServerSession } from "next-auth/next";
import { authOptions } from "../auth/[...nextauth]";
import { v4 as uuidv4 } from 'uuid';

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
  const areadatabase = client.db("my-made-Areas");

  const {
    orderPhone,
    addres,
    ApartmentRoomsNumber,
    NumberOfBaths,
    ResurveDate,
    orderPrice,
    ApartmentSize,
    JobDescription,
    city,
    name,
    FromH,
    ToH
  } = req.body;



  try {
    const newOrder = {
      name,
      orderPhone,
      addres,
      ApartmentRoomsNumber,
      NumberOfBaths,
      ResurveDate,
      JobDescription,
      orderPrice,
      ApartmentSize,
      city,
      FromH,
      ToH,
      createdAt: new Date(),
      orderId: uuidv4(),
      orderStatus: "Open",
    };

    // Add the order to the user's Orders array
    const usersCollection = database.collection('users');

    const userFilter = { email: userEmail };
    const updateUser = { $push: { Orders: newOrder }};
    const userResult = await usersCollection.updateOne(userFilter, updateUser);

    const areaCollection = areadatabase.collection(city);
    
    const addOrderToArea = await areaCollection.insertOne(newOrder);

    if (userResult.modifiedCount >= 1 && addOrderToArea.insertedCount >= 1) {
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
