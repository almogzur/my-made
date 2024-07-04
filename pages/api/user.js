

// pages/api/updateUserState.js

import { getSession } from 'next-auth/react'
import clientPromise from '@/lib/db'

export default async function handler(req, res) {

  if (req.method !== 'GET') {
    return res.status(405).json({ message: 'Method not allowed' })
  }

  const session = await getSession({ req })
  
  if (!session) {
    return res.status(401).json({ message: 'Unauthorized' })
  }

  const { state } = req.body

  try {
    const client = await clientPromise
    const db = client.db('my-made')
    const usersCollection = db.collection('users')

    const result = await usersCollection.updateOne(
      { email: session.user.email },
      { $set: state }
    )

    if (result.modifiedCount === 1) {
      res.status(200).json({ message: 'User state updated successfully' })
    } else {
      res.status(404).json({ message: 'User not found' })
    }
  } catch (error) {
    console.error('Error updating user state:', error)
    res.status(500).json({ message: 'Error updating user state' })
  }
}