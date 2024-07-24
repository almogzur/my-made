import clientPromise from '../../../lib/db';
import { getServerSession } from "next-auth/next";
import { authOptions } from "../auth/[...nextauth]";

const handler = async (req, res) => {
  const API_NAME = "UPDATE CUSTOMER INFO";

  console.log(API_NAME);

  if (req.method !== 'POST') {
    res.setHeader('Allow', ['POST']);
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
  const { phone, 
         addres, 
         ApartmentRoomsSize,
         NumberOfBathRooms,
         ResurveDate,
         PriceRange, 
         JobDescription,
        } = req.body;

  try {
    // Find the user by their email and update their customer information
    const filter = { email: userEmail };
    const updateDoc = {
      $set: {
        "state.Customer.phone": phone,
        "state.Customer.ApartmentRoomsSize": ApartmentRoomsSize,
        "state.Customer.NumberOfBathRooms": NumberOfBathRooms,
        "state.Customer.ResurveDate": ResurveDate,
        "state.Customer.PriceRange": PriceRange,
        "state.Customer.JobDescription": JobDescription,
        "state.Customer.addres": addres,

      }
    };

    const result = await users.updateOne(filter, updateDoc);

    if (result.modifiedCount >= 1) {
      console.log("Customer Info Updated");
      return res.status(200).json({ message: 'Customer profile updated successfully' });
    } else {
      console.log("User not found or no changes made");
      return res.status(200).json({ message: 'User not found or no changes made' });
    }
  } catch (error) {
    console.error(API_NAME, 'Error updating customer profile:', error);
    return res.status(500).json({ message: 'Error updating customer profile', error });
  } finally {
    // Close the database connection if needed
  }
};

export default handler;
