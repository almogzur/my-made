// Profile Page
// Profile Page
// Profile Page
// Profile Page
// Profile Page
// Profile Page

import { useSession } from 'next-auth/react'
import {useEffect,useState} from 'react'
import { useRouter } from 'next/router'
import LoadingSpinner from '@/components/Loader/LoadingSpinner'
import ProfileLayout from 'layouts/ProfileLayout'


const ProfilePage=()=>{

  const router = useRouter()
  const { data: session ,status ,update} = useSession()


  

useEffect(()=>{
    
    if (status === "unauthenticated" ) {
     router.push("/")

 }
},[])

 if (status === 'loading') {
     return <LoadingSpinner/>
}
 

return (
     <>
    <ProfileLayout>
   
     </ProfileLayout>

    </>
) 
}

export default ProfilePage