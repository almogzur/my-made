import NextAuth from "next-auth"
import GoogleProvider  from "next-auth/providers/google"
import { MongoDBAdapter } from "@auth/mongodb-adapter"
import clientPromise from '../../../lib/db'


export const authOptions = {
  // Configure one or more authentication providers
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      // ...
    }),
  ],
  callbacks: {
   async session({ session, token, user }) {
    // Send properties to the client, like an access_token and user id from a provider.
    // extanding Session Object 
    // passiong user id for db calls from Front end as slug quary 
      session.user.id = user.id
     // session.user.state = {}
      
      return session
   },
  /////////////////////////////////////////////////////////////////////////////
  // JWT work with cookies saving a Token  and verefing it on singin()
  /*async jwt({ token, user, account, profile, isNewUser }) {
  }
  */
 ////////////////////////////////////////////////////////////////////////// 
},

// when useing adapter Session Stratgy defualt back to Databace
adapter: MongoDBAdapter(clientPromise, {
  databaseName:"my-made",
  },  
),


  
}

export default NextAuth(authOptions)