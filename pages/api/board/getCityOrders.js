// pages/api/board/[city].js
import clientPromise from '../../../lib/db'

const handler = async (req, res) => {
  const { city } = req.query;

  if (req.method !== 'GET') {
    res.setHeader('Allow', ['GET']);
    return res.status(405).end(`Method ${req.method} Not Allowed`);
  }

  try {
    const client = await clientPromise;
    const areadatabase = client.db("my-made-Areas");
    const areaCollection = areadatabase.collection(city);

    const orders = await areaCollection.find({}).toArray();

    res.status(200).json(orders);
  } catch (error) {
    console.error('Error fetching orders:', error);
    res.status(500).json({ message: 'Error fetching orders' });
  }
};

export default handler;
