import clientPromise from '../../../lib/db';
import { getServerSession } from "next-auth/next";
import { authOptions } from "../auth/[...nextauth]";

const handler = async (req, res) => {
  const API_NAME = "Edit Order API";

  console.log(API_NAME);
  console.log(req.body);

  if (req.method !== 'PUT') {
    res.setHeader('Allow', ['PUT']);
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

  const { Id } = req.body;

  try {
    // Find the user by their email and update the order with the matching orderId
    const filter = { email: userEmail, 'Id': Id };
    const updateDoc = {
      $set: {
        ...req.body,
          'Orders.$.updateAt': new Date(),
      }
    };

    const result = await users.updateOne(filter, updateDoc);

    if (result.modifiedCount >= 1) {
      console.log("Order updated successfully");
      return res.status(200).json({ message: 'Order updated successfully' });
    } else {
      console.log("Order not found or no changes made");
      return res.status(200).json({ message: 'Order not found or no changes made' });
    }
  } catch (error) {
    console.error(API_NAME, 'Error updating order:', error);
    return res.status(500).json({ message: 'Error updating order', error });
  }
};

export default handler;
