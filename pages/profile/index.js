// Profile Page
// Profile Page
// Profile Page
// Profile Page
// Profile Page
// Profile Page

import { useSession } from 'next-auth/react'
import {useContext, useEffect,useState} from 'react'
import { useRouter } from 'next/router'
import LoadingSpinner from '@/components/Loader/LoadingSpinner'
import ProfileLayout from 'layouts/ProfileLayout'
import ProfileHeader from '@pages/profile/ProfileHeder'
import ProfileInfo from '@pages/profile/ProfileInfo'
import { ColorsContext, UserContext  } from 'Context/Context'
import useGetUser from '@/lib/hooks/useGetUser'
import useUpdateDbUserState from '@/lib/hooks/useUpdateDbUserState'
import MongoSpinner from '@/components/MongoSpinner/MongoSpinner'



const ProfilePage = () => {

  const router = useRouter()
  const { data: session ,status ,update} = useSession()
  const [ state,setState]=useContext(UserContext)

  /// find user 
  // extend user collection with state 
  const {DBUser,DBUserLoading,DBUserErr} = useUpdateDbUserState("/api/savestatetouserdb",state)



  // see
  

  // Prevent Slug Navigation     
  useEffect(()=>{
    if (status === "unauthenticated"){
     router.push("/")
 }
})

useEffect(()=>{
  console.log(DBUser)
},[DBUser])




    if (status === 'loading'){
     return <LoadingSpinner/>
    }
    else if( DBUserLoading ){
      return <MongoSpinner/>
    }


return (
 <ProfileLayout>

      <ProfileHeader
         name={session?.user?.name+" " }
         image={session?.user?.image}
    />
       <ProfileInfo 
          state={state}
          setState={setState}
          session={session}
    />

 </ProfileLayout>

    
) 
}

export default ProfilePage