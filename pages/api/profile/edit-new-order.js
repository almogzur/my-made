// pages/api/profile/edit-new-order.js
import clientPromise from '../../../lib/db';
import { getServerSession } from "next-auth/next";
import { authOptions } from "../auth/[...nextauth]";

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


  try {

    const user = await usersCollection.findOne({ email: userEmail });
    if (!user) {
      console.log("User not found");
      return res.status(404).json({ message: 'User not found' });
    }

    const filterProfileOrders = { email: userEmail, "Profile_Orders._id" : _id  };

    const updatedOrder = {
      city,
      updatedByUserAt: new Date(),
      ...updateFields,
       ownerId:user._id,
       _id:_id
       
    };
    

    const userResult = await usersCollection.updateOne(
      filterProfileOrders,
      {$set:{"Profile_Orders.$": updatedOrder}},
      
    );
        const cityCollection = areadatabase.collection(city);

        const cityResult = await cityCollection.updateOne({ "_id": _id },{ $set: updatedOrder })

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
