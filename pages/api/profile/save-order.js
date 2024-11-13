import clientPromise from '../../../lib/db';
import { getServerSession } from "next-auth/next";
import { authOptions } from "../auth/[...nextauth]";
import { v4 as uuidv4 } from 'uuid';
import { ObjectId } from 'mongodb';

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
  const usersCollection = database.collection('users');


  const userEmail = session.user.email;
  const userId = ObjectId.createFromHexString(session.user.id)

  try {


    // Find user by email to get their _id
     
    const name = session.user.name
    const status = "Open"
    const {date , city,  ...rest} = req.body

    const Doc = {
        name,
        status,
        city,
        "date":date.slice(0,10),
        ...rest,
        createdAt: new Date(),
       _id: uuidv4(),
       ownerId: userId, 
    };

    // Add the order to the user's Orders array
    const userFilter = { email: userEmail }
    const userOperation = { $push: { Profile_Orders: Doc } };
    const userResult = await usersCollection.updateOne(userFilter , userOperation );

    const areaCollection = areadatabase.collection(city);

    const addOrderToArea = await areaCollection.insertOne(Doc);

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
