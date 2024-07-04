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


     const getData = async (URL) => {
          try {
            const response = await fetch(URL);
          if (response.ok) {
             const json = await response.json();
                return json
              }
          else{
                throw new Error(`Response status: ${response.status}`);
              }
              }
          catch (error) {
                console.error(error.message);
               }
 }

const ProfilePage = ({dbUser}) => {

  const router = useRouter()

  const { data: session ,status ,update} = useSession()

  const [state,setState]=useContext(UserContext)

  useEffect(()=>{
    getData(`http://localhost:3000/api/user`).then((data)=>{
      console.log(data)
    })
  },[dbUser])

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