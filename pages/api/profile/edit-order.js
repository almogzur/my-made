import clientPromise from '../../../lib/db';
import { getServerSession } from "next-auth/next";
import { authOptions } from "../auth/[...nextauth]";

/**
 * Edit Order API
 * This API endpoint allows authenticated users to update an existing order in their profile.
 * The API first locates the user by email and searches for the specified order in 
 * Profile_Active_Orders first, and then Profile_Orders using the provided _id.
 * If the order is not found, it returns an error message.
 */

const handler = async (req, res) => {
  const API_NAME = "Edit Order API";
  console.log(API_NAME);
  console.log(req.body);

  // Step 1: Ensure the request method is PUT
  if (req.method !== 'PUT') {
    res.setHeader('Allow', ['PUT']);
    console.log(`Method ${req.method} Not Allowed`);
    return res.status(405).end(`Method ${req.method} Not Allowed`);
  }

  // Step 2: Verify that the user is authenticated
  const session = await getServerSession(req, res, authOptions);
  if (!session) {
    console.log(API_NAME, 'Unauthorized');
    return res.status(401).json({ message: 'Unauthorized' });
  }

  // Step 3: Set up database connections and obtain the user's email
  const client = await clientPromise;
  const userEmail = session.user.email;
  const database = client.db('my-made');
  const areadatabase = client.db('my-made-Areas');
  const usersCollection = database.collection('users');
  const { _id, status, city, Vendor_ID, ...updateFields } = req.body;

  try {
    // Step 4: First, try to locate the order in `Profile_Active_Orders`
    let userResult;
    const filterProfileActiveOrders = { email: userEmail, 'Profile_Active_Orders._id': _id };

    // Attempt to find and update the order in Profile_Active_Orders
    userResult = await usersCollection.findOne(filterProfileActiveOrders);
    if (userResult) {
      // Order found in Profile_Active_Orders, update it
      const updateDoc = {
        $set: {
          "Profile_Active_Orders.$": { ...updateFields, _id, city, status, updatedByUserAt: new Date() }
        }
      };
      await usersCollection.updateOne(filterProfileActiveOrders, updateDoc);
      console.log("Order updated in Profile_Active_Orders");
    } else {
      // If not found in Profile_Active_Orders, attempt to find in Profile_Orders
      const filterProfileOrders = { email: userEmail, 'Profile_Orders._id': _id };
      userResult = await usersCollection.findOne(filterProfileOrders);

      if (userResult) {
        // Order found in Profile_Orders, update it
        const updateDoc = {
          $set: {
            "Profile_Orders.$": { ...updateFields, _id, city, status, updatedByUserAt: new Date() }
          }
        };
        await usersCollection.updateOne(filterProfileOrders, updateDoc);
        console.log("Order updated in Profile_Orders");
      } else {
        // If the order is not found in either Profile_Active_Orders or Profile_Orders
        console.log("Order not found in Profile_Active_Orders or Profile_Orders");
        return res.status(404).json({ message: 'Order not found' });
      }
    }

    // Step 5: Conditionally update the order in the appropriate collection based on status
    if (status === "Open") {
      // Update the order in the `city` collection if the status is "open"
      const cityCollection = areadatabase.collection(city);
      await cityCollection.updateOne(
        { "_id": _id },
        { $set: { ...updateFields, _id, city, updatedByUserAt: new Date() } }
      );
      console.log("Order updated in city collection");

    } else if (status === "inProcess") {
      // Locate and update the vendor's `Vendor_Orders` using `Vendor_ID` and order `_id`
      const vendorFilter = { "Vendor._id": Vendor_ID, "Vendor.Vendor_Orders._id": _id };
      const vendorUpdateDoc = {
        $set: {
          "Vendor.Vendor_Orders.$": { 
            ...updateFields, 
            _id, 
            city, 
            status, 
            updatedByUserAt: new Date() 
          }
        }
      };

      const vendorResult = await usersCollection.updateOne(vendorFilter, vendorUpdateDoc);

      if (vendorResult.modifiedCount > 0) {
        console.log("Order updated in vendor's active orders");
      } else {
        console.log("Order not found in vendor's orders");
      }
    }

    // Return success message indicating completion of updates
    return res.status(200).json({ message: 'Order updated successfully in appropriate collections' });
  } catch (error) {
    // Error handling for issues during the update process
    console.error(API_NAME, 'Error updating order:', error);
    return res.status(500).json({ message: 'Error updating order', error });
  }
};

export default handler;
