
import clientPromise from '@/lib/db'

export default async function handler(req, res) {
  const client = await clientPromise;
  const db = client.db("my-made");
  const users =  db.collection("users").find();
  const a =[]

   for await (const doc of users){
   
     a.push(doc)
  
   }
   console.log(a)
   res.status(200).json(a);
  
  
  
}