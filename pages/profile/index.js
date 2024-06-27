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
import ProfileHeader from './PrifileHeder'
import ProfileInfo from './ProfileInfo'
import { UserContaxt,  } from 'contaxt/contaxt'


const ProfilePage = () => {

  const router = useRouter()
  const { data: session ,status ,update} = useSession()
  const [User,setUser]=useContext(UserContaxt)

useEffect(()=>{
    // Prevent Slug Navigation     
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
        text={session?.user?.name+" " }
        image={session?.user?.image }
     />
     <ProfileInfo
        UserObject={User}

     />
     </ProfileLayout>

    
) 
}

export default ProfilePage