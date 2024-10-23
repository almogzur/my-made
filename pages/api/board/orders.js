import clientPromise from '../../../lib/db';

const handler = async (req, res) => {
  if (req.method !== 'GET') {
    res.setHeader('Allow', ['GET']);
    return res.status(405).end(`Method ${req.method} Not Allowed`);
  }

  const {city} = req.query 

  console.log(city);
  
   try {
     const client = await clientPromise;
     const areadatabase = client.db("my-made-Areas");

     if (!city) {
         return  res.status(500).json({message:"No City Provided"})
      }
       const collection = areadatabase.collection(city);
       const data = await collection.find({}).toArray();
       
           if (!data.length) {
              return res.status(404).json({ message: `No data found for city: ${city}` });
            }

       return res.status(200).json(data);

     
   } catch (error) {
     console.error('Error fetching data:', error);
     res.status(500).json({ message: 'Error fetching data' });
   }
};

export default handler;

// THIS GET ALL ORDERS FROM ALL Collection to be userd 
// else {
//   // If no city is provided, return all data from all collections
//   const cityCollections = await areadatabase.listCollections().toArray();
//   const allData = {};

//   for (const cityCollection of cityCollections) {
//     const collectionName = cityCollection.name;
//     const data = await areadatabase.collection(collectionName).find({}).toArray();
//     allData[collectionName] = data;
//   }

//   return res.status(200).json(allData);
// }
