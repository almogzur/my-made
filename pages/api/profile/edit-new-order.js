// pages/api/profile/edit-new-order.js



import clientPromise from '../../../lib/db';
import { getServerSession } from "next-auth/next";
import { authOptions } from "../auth/[...nextauth]";
import { ObjectId } from 'mongodb';

const handler = async (req, res) => {
  const API_NAME = "Edit Open Order API";
  console.log(API_NAME);
  console.log(req.body);

  if (req.method !== 'PUT') {
    res.setHeader('Allow', ['PUT']);
    return res.status(405).end(`Method ${req.method} Not Allowed`);
  }

  const session = await getServerSession(req, res, authOptions);
  if (!session) {
    return res.status(401).json({ message: 'Unauthorized' });
  }

  const client = await clientPromise;
  const database = client.db('my-made');
  const areadatabase = client.db('my-made-Areas');
  const usersCollection = database.collection('users');


  const { _id, city, ...updateFields } = req.body;
  const userEmail = session.user.email;
  const userId = session.user.id
  const cityCollection = areadatabase.collection(city);


  try {

    const Doc = {
      city,
      updatedByUserAt: new Date(),
      ...updateFields,
       ownerId:ObjectId.createFromHexString(userId),
       _id:_id
       
    };
    
    const profileFilter = { email: userEmail, "Profile_Orders._id" : _id  };
    const profileOperation = {$set:{"Profile_Orders.$": Doc}}
    const userResult = await usersCollection.updateOne( profileFilter, profileOperation);


      const cityFilter = { "_id": _id }
      const cityOperation = { $set: Doc }
      const cityResult = await cityCollection.updateOne(cityFilter, cityOperation)

          if (userResult.acknowledged  && cityResult.acknowledged) {
            console.log("Order Edited successfully");
          return res.status(200).json({ message: 'Order Edited successfully' });
        } else {
          console.log(userResult,addOrderToArea );
          return res.status(200).json({ message: ' no changes made' });
        }

     } catch (error) {
    console.error(API_NAME, 'Error updating open order:', error);
    return res.status(500).json({ message: 'Error updating open order', error });
  }
};

export default handler;
