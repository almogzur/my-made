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

      const Doc = {
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


      const vendorFilter =  {email:vendorEmail }
      const vendorOperation = { $push : { "Vendor.Vendor_Orders": Doc  } }
      const VendorResult =  await usersCollection.updateOne( vendorFilter , vendorOperation )   

      const clientFiler = { _id: Owner._id }

      const clientOperation = { 
         $pull: { "Profile_Orders": { _id: _id } },  
         $push: { "Profile_Active_Orders": Doc } 
        }

      const ClientResult =  await usersCollection.updateOne(clientFiler,clientOperation)

         if(VendorResult.acknowledged  && ClientResult.acknowledged  ){
            const deleteResult =  await cityCollection.deleteOne({ "_id": _id })

              if(deleteResult.acknowledged){
                  return res.status(200).json({ message: 'Order moved and updated successfully for both client and vendor' });
                }else{
                  return status(200).json({massage:'order was not removed from cityCollection '})
                }
              
         }else{
             console.log(error);
             return res.status(200).json({massage:"update not acknowledged"})
            
       }


  } catch (error) {
    console.error("Unexpected server error:", error);
    return res.status(500).json({ message: 'Unexpected server error' });
  }

}
