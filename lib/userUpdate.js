// pages/api/update-user.js

import { getServerSession } from "next-auth/next"
import { authOptions } from "./auth/[...nextauth]"
import { ObjectId } from 'mongodb'
import clientPromise from "@lib/db"

export default async function handler(req, res) {
  if (req.method !== 'PUT') {
    return res.status(405).json({ message: 'Method not allowed' })
  }

  const session = await getServerSession(req, res, authOptions)

  if (!session) {
    return res.status(401).json({ message: 'Unauthorized' })
  }

  const { Info, isVendor, isCustomer } = req.body

  try {
    const client = await clientPromise
    const db = client.db()

    const result = await db.collection('users').updateOne(
      { _id: ObjectId(session.user.id) },
      {
        $set: {
          Info,
          isVendor,
          isCustomer
        }
      }
    )

    if (result.modifiedCount === 1) {
      res.status(200).json({ message: 'User updated successfully' })
    } else {
      res.status(404).json({ message: 'User not found' })
    }
  } catch (error) {
    console.error('Error updating user:', error)
    res.status(500).json({ message: 'Error updating user' })
  }
}