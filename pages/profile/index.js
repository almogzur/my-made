// Profile Page
// Profile Page
// Profile Page
// Profile Page
// Profile Page
// Profile Page

import { useSession } from 'next-auth/react'
import {useEffect,useState} from 'react'
import { useRouter } from 'next/router'
import FooterRwapper from '@/components/Footer/FooterRwapper'
import LoadingSpinner from '@/components/Loader/LoadingSpinner'
import SideBar from '@/components/Sidebar/SideBarWrapper'
import CostumeLink from '@/components/Footer/CostumeLink'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {faHouse , faBroom , faPerson , faClipboard }from "@fortawesome/free-solid-svg-icons"

const ProfilePage=()=>{

  const router = useRouter()
  const { data: session ,status ,update} = useSession()

  useEffect(()=>{
    
 if (status === "unauthenticated" ) {
     router.push("/")
 }
})
 if (status === 'loading') {
     return <LoadingSpinner/>
}

return (<>
    <SideBar
        sidebBarClassName={"profile-sidebar"}
   
    >
        <CostumeLink
            href={"board"}
            text="לוח"
        
          >
        <FontAwesomeIcon size="1x" icon={faClipboard}/>
        </CostumeLink>

        <CostumeLink  
              text={"משק"}
              href="/vendor"
              index={2}
              >
              <FontAwesomeIcon size="1x" icon={faBroom} />
        </CostumeLink>

        <CostumeLink
                href="/costumer"
                text={"לקוח"}
                index={3}             
                >
                 <FontAwesomeIcon size="1x" icon={faPerson} />
        </CostumeLink> 
           
   </SideBar>     
    <FooterRwapper/>
</>) 
}

export default ProfilePage