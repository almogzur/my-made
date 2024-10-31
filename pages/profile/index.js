import { useSession } from 'next-auth/react'
import {useEffect,useState} from 'react'
import { useRouter } from 'next/router'
import UserProfile from '../../pages-components/profile/user-profile'
import HomePageNavigation from '../../pages-components/home/home-navigation'

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
    <HomePageNavigation/>
    <UserProfile/>

  </>)

}

export default ProfilePage