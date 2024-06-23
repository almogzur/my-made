import { useSession } from 'next-auth/react'
import {useEffect,useState} from 'react'
import { useRouter } from 'next/router'
import FooterRwapper from '@/components/Footer/FooterRwapper'
import LoadingSpinner from '@/components/Loader/LoadingSpinner'
import SideBar from '@/components/Sidebar/SideBarWrapper'

const ProfilePage=()=>{

  const router = useRouter()
  const { data: session ,status ,update} = useSession()

  useEffect(()=>{
              
 if (!session) {
     router.push("/")
 }
})
    if (status === 'loading') {
     return <LoadingSpinner/>
}

return (<>
    <SideBar
        className={"profile-sidebar"}
    >
        
    </SideBar>
    <FooterRwapper/>
</>) 
}

export default ProfilePage