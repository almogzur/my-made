import dynamic from 'next/dynamic';
import { faBroom, faPerson } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Colors from "@/lib/colors";

// Dynamic imports
const SideBar = dynamic(() => import('components/Sidebar/SideBarWrapper'), {
  ssr: true, // Only render on the client side
  loading: () => <div>Loading Sidebar...</div>
});

const CostumeLink = dynamic(() => import('@/components/CostumeLink/CostumeLink'), {
  loading: () => <div>Loading Link...</div>
});

const Footer = dynamic(() => import('components/Footer/Footer'), {
  loading: () => <div>Loading Footer...</div>
});

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
  }

  return (
    <>
      <SideBar
        style={{
          position: "fixed",
          bottom: "80px",
          left: "20px",
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
        >
          <FontAwesomeIcon size="1x" icon={faBroom} />
        </CostumeLink>

        <CostumeLink
          href="/profile/customer"
          text={"לקוח"}
          motionWrapperStyle={WrapperDefaultStyle}
          linkStyle={DefaultLinkStyle}
          divStyle={DivDefaultStyle}
        >
          <FontAwesomeIcon size="1x" icon={faPerson} />
        </CostumeLink>
      </SideBar>

      {children}

      <Footer
        
      />
    </>
  )
}

export default ProfileLayout;
