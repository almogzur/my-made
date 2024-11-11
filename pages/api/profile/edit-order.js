import clientPromise from '../../../lib/db';
import { getServerSession } from "next-auth/next";
import { authOptions } from "../auth/[...nextauth]";

/**
 * Edit Order API
 * This API endpoint allows authenticated users to update an existing order in their profile.
 * The API first locates the user by email and searches for the specified order in 
 * either `Profile_Orders` or `Profile_Active_Orders` using the provided `_id`.
 * Based on the `status` of the order, the API will conditionally update the order 
 * in the vendor's `Vendor_Orders` array if the status is "inProcess" and the 
 * `Vendor_ID` field is present in the order details.
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
    // Step 4: Locate the user and attempt to update the order in `Profile_Orders` or `Profile_Active_Orders`
    let userResult;
    const filterProfileOrders = { email: userEmail, 'Profile_Orders._id': _id };
    const filterProfileActiveOrders = { email: userEmail, 'Profile_Active_Orders._id': _id };

    // Prepare the update document with additional timestamp
    
    const updateDoc = {
      $set: {
        ...updateFields, 
        "updatedByUserAt": new Date()
      }
    };

    // Try updating in `Profile_Orders`; if not found, update in `Profile_Active_Orders`
    userResult = await usersCollection.updateOne(filterProfileOrders, updateDoc);
    if (userResult.modifiedCount < 1) {
      userResult = await usersCollection.updateOne(filterProfileActiveOrders, updateDoc);
    }

    // Check if the order was updated successfully
    if (userResult.modifiedCount < 1) {
      console.log("Order not found in Profile_Orders or Profile_Active_Orders");
      return res.status(200).json({ message: 'Order not found or no changes made' });
    }

    console.log("User's order updated successfully");

    // Step 5: Conditionally update the order in the appropriate collection based on status
    if (status === "open") {
      // Update the order in the `city` collection if the status is "open"
      const cityCollection = areadatabase.collection(city);
      await cityCollection.updateOne(
        { "_id": _id },
        { $addToSet: { ...updateFields, updatedByUserAt: new Date() } }
      );
      console.log("Order updated in city collection");

    } else if (status === "inProcess") {
      // Locate and update the vendor's `Vendor_Orders` using `Vendor_ID` and order `_id`
      const vendorFilter = { "Vendor._id": Vendor_ID, "Vendor.Vendor_Orders._id": _id };
      const vendorUpdateDoc = {
        $set: {
          "Vendor.Vendor_Orders.$": {
            ...updateFields,
            "updatedByUserAt": new Date()
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
