import { faBroom , faPerson }from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import SideBar from 'components/Sidebar/SideBarWrapper'
import CostumeLink from '@/components/CostumeLink/CostumeLink'
import Footer from 'components/Footer/Footer'
import Colors from "@/lib/colors"

const ProfileLayout = ({children})=>{

  const WrapperDefualtStyle = {
    color:Colors.d
    
  }
  const DefaultLinkStyle = {
    textDecoration:"none"
  }
  const DivDefualtStyle= {
    
    display:'flex',
    flexDirection:'column',
    justifyContent:'center',
    alignItems:'center',
    alignContent:'center',
    width:"100%",
    height:"70px",
    
  }


return (
    <>
  <SideBar
        style={{
          position: "fixed",
          bottom: "80px",
          left: "20px", 
          width:"70px",
          background:Colors.c,
        }
        }
    >
        <CostumeLink  
              text={"משק"}
              href="/profile/vendor"
              motionWrapperStyle= {WrapperDefualtStyle}
              linkStyle={DefaultLinkStyle}
              divStyle={DivDefualtStyle}

           >
           <FontAwesomeIcon size="1x" icon={faBroom} />
        </CostumeLink>

        <CostumeLink
                href="/profile/customer"
                text={"לקוח"}
                motionWrapperStyle= {WrapperDefualtStyle}
                linkStyle={DefaultLinkStyle}
                divStyle={DivDefualtStyle}

         
            >
           <FontAwesomeIcon size="1x" icon={faPerson} />
        </CostumeLink> 
           
  </SideBar> 

    {children}

  <Footer
    style={{
         position: "fixed",
          bottom: "0",
          width:"100%",
          height:"55px",
          background:Colors.a,
          color:"white",
         display:"flex",}}
  />
    </>
) 
}

export default ProfileLayout