import clientPromise from '../../../lib/db';


export default async function handler(req, res) {

  const { Id, email, city } = req.body;

  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  if (!Id || !email || !city) {
    return res.status(400).json({ message: 'Missing required fields: Id, email, or city' });
  }

  try {
    const client = await clientPromise;
    const database = client.db('my-made');
    const areadatabase = client.db('my-made-Areas');

    const usersCollection = database.collection('users');
    const cityCollection = areadatabase.collection(city);

 // Retrieve the order document
    const order = await cityCollection.findOne({  Id });
    if (!order) {
      console.log("User Err");
      
      return res.status(404).json({ message: 'Order not found in city collection' });
    }


    // Retrieve the user document
    const user = await usersCollection.findOne({ email: email });
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

 
    if (order.ownerId.toString() === user._id.toString()) {
      return res.status(400).json({ message: "לקוח שפותח הזמנה לא יכול למשוך אותה בתור משק  " });
    }
    // Add the order to the user's vendor orders array

    
    await usersCollection.updateOne(
      { email: email ,  },
      { $push: { 'Vendor.Vendor_Active_Order': order } }
    );

    // Remove the order from the city's orders array

    const deleteResult = await cityCollection.deleteOne({ Id });

    if(!deleteResult.deletedCount === 1 ){
            
        return res.status(404).json({massage:"Order is Not Removed from DB"})

    }
 

    // Success response
    return res.status(200).json({ message: 'Order moved successfully' });
  } catch (error) {
    console.error("Error moving order:", error);
    return res.status(500).json({ message: 'Server error' });
  }
  finally{

  }
  
}
