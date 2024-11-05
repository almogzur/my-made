import clientPromise from '../../../lib/db';


export default async function handler(req, res) {
  const { orderId, userEmail, city } = req.body;

  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  if (!orderId || !userEmail || !city) {
    return res.status(400).json({ message: 'Missing required fields: orderId, userEmail, or city' });
  }

  try {
    const client = await clientPromise;
    const database = client.db('my-made');
    const areadatabase = client.db('my-made-Areas');

    const usersCollection = database.collection('users');
    const cityCollection = areadatabase.collection(city);


    const order = await cityCollection.findOne({  orderId });
    if (!order) {
      console.log("User Err");
      
      return res.status(404).json({ message: 'Order not found in city collection' });
    }


    // Retrieve the user document
    const user = await usersCollection.findOne({ email: userEmail });
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Add the order to the user's vendor orders array
    await usersCollection.updateOne(
      { email: userEmail },
      { $push: { 'Vendor.Orders': order } }
    );

 // Remove the order from the city's orders array

    const deletResult = await cityCollection.deleteOne({ orderId });

    if(!deletResult.deletedCount ===1 ){
            
        return res.status(404).json({massage:"Order is Not Removed from DB"})

    }
    console.log(deletResult);


    // Success response
    return res.status(200).json({ message: 'Order moved successfully' });
  } catch (error) {
    console.error("Error moving order:", error);
    return res.status(500).json({ message: 'Server error' });
  }
  finally{

  }
  
}
