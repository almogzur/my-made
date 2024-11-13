import NextAuth from "next-auth"
import GoogleProvider  from "next-auth/providers/google"
import { MongoDBAdapter } from "@auth/mongodb-adapter"
import clientPromise from '../../../lib/db'


export const authOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      // ...
    }),
  ],
  callbacks: {
    async session({session, token, user}) {
      session = {...session,
        // extending the session widt the user id 
        // for back end 
        // insted of puling the id out of db see edit-new-order line 33   
          user: {
              id: user.id,
              ...session.user
          }
      }
      return session
  },
  
  /////////////////////////////////////////////////////////////////////////////
  // JWT work with cookies saving a Token  and verefing it on singin()
  /*async jwt({ token, user, account, profile, isNewUser }) {
  }
  */
 ////////////////////////////////////////////////////////////////////////// 
},

// when useing adapter Session Stratgy defualts back to Database
adapter: MongoDBAdapter(clientPromise, {
  databaseName:"my-made",
  },  
),


  
}

export default NextAuth(authOptions)