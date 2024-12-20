import { useSession } from 'next-auth/react'
import {useEffect,useState} from 'react'
import { useRouter } from 'next/router'
import ProfileWrapper from '../../pages-components/profile/profile-wrapper'
import Navigation from '../../pages-components/navigation'

const ProfilePage=()=>{

  const router = useRouter()
  const { data: session ,status ,update} = useSession()

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/");
    }
  }, [status, router]);

    if (status === 'loading') {
     return <h1 style={{textAlign:'center'}}>Loading...</h1>
}

return (
  <>
    <Navigation/>
    <ProfileWrapper/>

  </>)

}

export default ProfilePage