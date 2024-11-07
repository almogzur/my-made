import clientPromise from '../../../lib/db';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  const { orderId, vendorEmail, city } = req.body;

  if (!orderId || !vendorEmail || !city) {
    return res.status(400).json({ message: 'Missing required fields' });
  }

  try {
    // Database connection
    const client = await clientPromise;
    const database = client.db('my-made');
    const areadatabase = client.db('my-made-Areas');
    const usersCollection = database.collection('users');
    const cityCollection = areadatabase.collection(city);

    // Retrieve the order from the city collection
    let clientOrder;
    try {
      clientOrder = await cityCollection.findOne({ "_id": orderId });
      if (!clientOrder) {
        return res.status(404).json({ message: 'Order not found in city collection' });
      }
    } catch (error) {
      console.error("Error retrieving order from city collection:", error);
      return res.status(500).json({ message: 'Error retrieving order from city collection' });
    }

    // Retrieve the vendor's data
    let vendor;
    try {
      vendor = await usersCollection.findOne({ email: vendorEmail });
      if (!vendor) {
        return res.status(404).json({ message: 'Vendor not found' });
      }
    } catch (error) {
      console.error("Error retrieving vendor data:", error);
      return res.status(500).json({ message: 'Error retrieving vendor data' });
    }

    // Check if the vendor is the original owner of the order
    if (clientOrder.ownerId.toString() === vendor._id.toString()) {
      return res.status(400).json({ message: "לקוח שפותח הזמנה לא יכול למשוך אותה בתור משק" });
    }

    // Define the updated order details
    const updatedOrder = {
      ...clientOrder,
      Vendor_Name: vendor.Vendor?.name,
      Vendor_Phone: vendor.Vendor?.phone,
      Vendor_Action_Date: new Date(),
      status: 'inProcess'
    };

    // Update the client's copy of the order in `Profile_Orders`
    try {
      await usersCollection.updateOne(
        { _id: clientOrder.ownerId, "Profile_Orders._id": orderId },
        {
          $set: {
            "Profile_Orders.$.Vendor_Name": vendor.name,
            "Profile_Orders.$.Vendor_Phone": vendor.Vendor?.phone,
            "Profile_Orders.$.Vendor_Action_Date": updatedOrder.Vendor_Action_Date,
            "Profile_Orders.$.status": 'inProcess'
          }
        }
      );
    } catch (error) {
      console.error("Error updating client's Profile_Orders:", error);
      return res.status(500).json({ message: 'Error updating client\'s Profile_Orders' });
    }

    // Update the vendor's active orders, avoiding duplication
    try {
      await usersCollection.updateOne(
        { _id: vendor._id },
        {
          $addToSet: { "Vendor.Vendor_Orders": updatedOrder }
        }
      );
    } catch (error) {
      console.error("Error updating vendor's active orders:", error);
      return res.status(500).json({ message: 'Error updating vendor\'s active orders' });
    }

    // Remove the order from the city collection
    try {
      await cityCollection.deleteOne({ "_id": orderId });
    } catch (error) {
      console.error("Error removing order from city collection:", error);
      return res.status(500).json({ message: 'Error removing order from city collection' });
    }

    return res.status(200).json({ message: 'Order moved and updated successfully for both client and vendor' });
  } catch (error) {
    console.error("Unexpected server error:", error);
    return res.status(500).json({ message: 'Unexpected server error' });
  }
}
