// pages/api/profile/edit-in-process-order.js
import clientPromise from '../../../lib/db';
import { getServerSession } from "next-auth/next";
import { authOptions } from "../auth/[...nextauth]";
import { ObjectId , } from 'mongodb';

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
  const database = client.db('my-made');
  const usersCollection = database.collection('users');

  const { _id, city, Vendor_ID, status, ...updateFields } = req.body;
  const userEmail = session.user.email;
   

  try {

    const Client = usersCollection.findOne({email:userEmail})
    const Vendor = usersCollection.findOne( {_id:ObjectId.createFromHexString(Vendor_ID) } )

    const updateDoc = {
       ...updateFields, 
       _id,
       city,
       updatedByUserAt: new Date(),
       status,
       Vendor_ID:ObjectId.createFromHexString(Vendor_ID)
      }


    
     // Client 
    const clientFiler = { email:userEmail , "Profile_Active_Orders._id":_id }
        
    const userUpdateResult = await usersCollection.updateOne(clientFiler,{$set:{"Profile_Active_Orders.$":updateDoc}});
    

     // Vendor 
    const vendorFilter = { _id: ObjectId.createFromHexString(Vendor_ID) , "Vendor.Vendor_Orders._id": _id };

    const vendorResult = await usersCollection.updateOne(vendorFilter, {$set: {"Vendor.Vendor_Orders.$":updateDoc}});


    if (vendorResult.acknowledged && userUpdateResult.acknowledged ) {
      console.log( API_NAME , "Success");
    } else {
      console.log(API_NAME,"Failed");
    }

    return res.status(200).json({ message: 'In-process order updated successfully' });
  } catch (error) {
    console.error(API_NAME, 'Error updating in-process order:', error);
    return res.status(500).json({ message: 'Error updating in-process order', error });
  }
};

export default handler;
