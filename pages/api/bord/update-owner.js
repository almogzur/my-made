import { error } from 'console';
import clientPromise from '../../../lib/db';
import { ObjectId  } from 'mongodb';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  const {  vendorEmail  , order } = req.body;
  const { status , _id, city, ownerId , ...restOfOrder} = order


  if ( !_id || !vendorEmail || !order.city) {
    return res.status(400).json({ message: 'Missing required fields' });
  }

  try {
    // Database connection
    const client = await clientPromise;
    const database = client.db('my-made');
    const areadatabase = client.db('my-made-Areas');
    const usersCollection = database.collection('users');
    const cityCollection = areadatabase.collection(city);

 
      const Vendor_info = await usersCollection.findOne({ email: vendorEmail });
      const Owner  = await usersCollection.findOne({ _id :  ObjectId.createFromHexString(ownerId)})

    
    
     if ( order.ownerId === Vendor_info._id ) {
       return res.status(400).json({ message: "לקוח שפותח הזמנה לא יכול למשוך אותה בתור משק" });
     }

  //   Define the updated order details
      const updatedOrder = {
        Vendor_Name: Vendor_info.Vendor?.name,
       Vendor_Phone: Vendor_info.Vendor?.phone,
       Vendor_Action_Date: new Date(),
       Vendor_ID : Vendor_info._id,
       status: 'inProcess',
       city,
      ...restOfOrder,
      _id:_id,
      ownerId:ObjectId.createFromHexString(ownerId)

    };

    // Update the vendor's active orders, avoiding duplication



    const VendorResult =  await usersCollection.updateOne(  {email:vendorEmail }, { $push : { "Vendor.Vendor_Orders": updatedOrder  } })
    
     const ClientResult =  await usersCollection.updateOne({ _id: Owner._id },
        {
            $pull: { "Profile_Orders": { _id: _id } },  
            $push: { "Profile_Active_Orders": updatedOrder } // Add updated order to Profile_Active_Orders
         }
       )

      const deleteResult =  await cityCollection.deleteOne({ "_id": _id });

         if(VendorResult.acknowledged  && ClientResult.acknowledged && deleteResult.acknowledged ){
           return res.status(200).json({ message: 'Order moved and updated successfully for both client and vendor' });
         }else{
             console.log(error);
             return res.status(200).json({massage:"update not acknowledged"})
            
       }


  } catch (error) {
    console.error("Unexpected server error:", error);
    return res.status(500).json({ message: 'Unexpected server error' });
  }

}
