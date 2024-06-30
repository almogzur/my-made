import { faBroom , faPerson }from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import SideBar from 'components/Sidebar/SideBarWrapper'
import CostumeLink from 'components/Footer/CostumeLink'
import Footer from 'components/Footer/Footer'

const ProfileLayout = ({children})=>{

return (
    <>
  <SideBar
        sidebBarClassName={"profile-sidebar"}
    >
        <CostumeLink  
              text={"משק"}
              href="/profile/vendor"
              linkClassName={"side-bar-link-wrapper"}
              divClassName={"side-bar-link"}
           >
           <FontAwesomeIcon size="1x" icon={faBroom} />
        </CostumeLink>

        <CostumeLink
                href="/profile/customer"
                text={"לקוח"}
                linkClassName={"side-bar-link-wrapper"}
                divClassName={"side-bar-link"}
            >
           <FontAwesomeIcon size="1x" icon={faPerson} />
        </CostumeLink> 
           
  </SideBar> 

    {children}

  <Footer/>
    </>
) 
}

export default ProfileLayout