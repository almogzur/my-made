import dynamic from 'next/dynamic';
import { faBroom, faPerson } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Colors from "@lib/colors";
import SideBar from '@components/side-bar/SideBar';
import CostumeLink from '@components/costume-link/CostumeLink';
import Footer from '@components/footer/Footer';


const ProfileLayout = ({ children }) => {

  const WrapperDefaultStyle = {
    color: Colors.d
  }

  const DefaultLinkStyle = {
    textDecoration: "none"
  }

  const DivDefaultStyle = {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    alignContent: 'center',
    width: "100%",
    height: "70px",
    color:Colors.a
  }

  return (
    <>
    
      <SideBar
        style={{
          position: "fixed",
          bottom: "60px",
          left: "5px",
          width: "70px",
          background: Colors.c,
        }}
      >
        <CostumeLink
          text={"משק"}
          href="/profile/vendor"
          motionWrapperStyle={WrapperDefaultStyle}
          linkStyle={DefaultLinkStyle}
          divStyle={DivDefaultStyle}
          onHoverColor={Colors.d}
        >
          <FontAwesomeIcon size="1x" icon={faBroom} />
        </CostumeLink>

        <CostumeLink
          href="/profile/customer"
          text={"לקוח"}
          motionWrapperStyle={WrapperDefaultStyle}
          linkStyle={DefaultLinkStyle}
          divStyle={DivDefaultStyle}
          HoverBackgroundColor={"green"}
          onH={Colors.d}
        >
          <FontAwesomeIcon 
           size="1x"
           icon={faPerson}
 
            />
        </CostumeLink>
      </SideBar>

      {children}

      <Footer
        
      />
    </>
  )
}

export default ProfileLayout;
