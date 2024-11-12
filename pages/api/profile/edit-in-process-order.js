// pages/api/profile/edit-in-process-order.js
import clientPromise from '../../../lib/db';
import { getServerSession } from "next-auth/next";
import { authOptions } from "../auth/[...nextauth]";

const handler = async (req, res) => {
  const API_NAME = "Edit In-Process Order API";
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
  const userEmail = session.user.email;
  const database = client.db('my-made');
  const usersCollection = database.collection('users');

  const { _id, city, Vendor_ID, status, ...updateFields } = req.body;

  try {
    // Step 1: Locate and update the order within `Profile_Active_Orders`
    const filterProfileActiveOrders = { email: userEmail, 'Profile_Active_Orders._id': _id };
    const updateDoc = {
      $addToSet: {
        "Profile_Active_Orders.$": { ...updateFields, _id, city, status, updatedByUserAt: new Date() }
      }
    };
    const userResult = await usersCollection.updateOne(filterProfileActiveOrders, updateDoc);

    if (userResult.modifiedCount === 0) {
      return res.status(404).json({ message: 'Order not found in Profile_Active_Orders' });
    }

    // Step 2: Update the order in the vendor's active orders
    const vendorFilter = { "_id": Vendor_ID, "Vendor.Vendor_Orders._id": _id };
    const vendorUpdateDoc = {
      $addToSet: {
        "Vendor.Vendor_Orders.$": { ...updateFields, _id, city, updatedByUserAt: new Date() }
      }
    };
    const vendorResult = await usersCollection.updateOne(vendorFilter, vendorUpdateDoc);

    if (vendorResult.modifiedCount > 0) {
      console.log("Order updated in vendor's orders");
    } else {
      console.log("Order not found in vendor's orders");
    }

    return res.status(200).json({ message: 'In-process order updated successfully' });
  } catch (error) {
    console.error(API_NAME, 'Error updating in-process order:', error);
    return res.status(500).json({ message: 'Error updating in-process order', error });
  }
};

export default handler;
