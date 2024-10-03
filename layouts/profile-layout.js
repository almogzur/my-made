import { faBroom, faPerson , faClipboard} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Colors from "../lib/colors";
import SideBar from '../components/side-bar/side-bar';
import CostumeLink from '../components/costume-link/costume-link'
import Footer from '../components/footer/app-footer';
import ProfileControls from '../components/profile-sing-in-out/profile-controls'


const ProfileLayout = ({ children }) => {

  const DefaultLinkStyle = {
      textDecoration: "none",
      color:Colors.d
  }

  const DivDefaultStyle = {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    alignContent: 'center',
    width: "100%",
    height: "45px",
    borderBottom:`solid ${Colors.d}`,
    color:Colors.d
  }

  return (
    <>
    
      <SideBar
        style={{
          position: "fixed",
          bottom: "60px",
          left: "5px",
          width: "40px",
          background: Colors.b,
          zIndex:2,
         
        }}
      >
        <CostumeLink
          text={"משק"}
          href="/profile/vendor"
          linkStyle={DefaultLinkStyle}
          divStyle={DivDefaultStyle}
        >
          <FontAwesomeIcon size="1x" icon={faBroom}  />
        </CostumeLink>

        <CostumeLink
          href="/profile/customer"
          text={"לקוח"}
          linkStyle={DefaultLinkStyle}
          divStyle={DivDefaultStyle}
          
           
        >
          <FontAwesomeIcon 
           size="1x"
           icon={faPerson}
 
            />
        </CostumeLink>

    

      </SideBar>

      {children}

      <Footer  >
         <ProfileControls  />
      </Footer>

    </>
  )
}

export default ProfileLayout;
