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
import ProfileHeader from '@pages/profile/PrifileHeder'
import ProfileInfo from '@pages/profile/ProfileInfo'
import { UserContext  } from 'Context/Context'


const ProfilePage = () => {

  const PAGE_STATE= "User"

  const router = useRouter()

  const { data: session ,status ,update} = useSession()

  const [state,setState]=useContext(UserContext)

  // Prevent Slug Navigation     
  useEffect(()=>{
  
    if (status === "unauthenticated"  ) {
     router.push("/")
 }
})

 if (status === 'loading') {
     return <LoadingSpinner/>
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