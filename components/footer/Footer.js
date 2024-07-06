// Nav Wrapper
// Nav Wrapper
// Nav Wrapper
// Nav Wrapper

import {FontAwesomeIcon} from "@fortawesome/react-fontawesome"
import { faHome, faClipboard } from "@fortawesome/free-solid-svg-icons";
import dynamic from "next/dynamic";
import LoadingSpinner from "../Loader/LoadingSpinner";
import Colors from "@/lib/colors";

const CostumeLink = dynamic(() => import("../CostumeLink/CostumeLink"), {
  ssr: false, // Disable server-side rendering if not needed
  loading: () => <LoadingSpinner/>, // Optional loading component
});
const ProfileControls = dynamic(() => import("@/components/NextAuth/ProfileControls"), {
  ssr: false, // Disable server-side rendering if not needed
  loading: () => <LoadingSpinner/>, // Optional loading component
});

const Footer = ({children,style,className})  => {

    const defualtStyle={
      position: "fixed",
      bottom: "0",
      width: "100%",
      height: "55px",
      background: Colors.a,
      color: "white",
      display: "flex",
    }

    return ( 
    <footer
            style={style?style:defualtStyle}
            className={className?className:null} 
           >
         <CostumeLink
            href={"/"}
            motionWrapperStyle={{
              width:"70px",
              display:'flex',
              flexDirection:'row'|'column',
              justifyContent:'center',
              alignItems:'center',
              alignContent:'center',
            }}
            linkStyle={{}}
            divStyle={{}}
           
           >
            <FontAwesomeIcon icon={faHome} size={"2x"} />
         </CostumeLink>

         <CostumeLink
              href={"/board"}
              motionWrapperStyle={{
                height:'inherit',
                width:"70px",
                border:"5px solid",
                display:'flex',
                flexDirection:'column',
                justifyContent:'center',
                alignItems:'center',
                alignContent:'center',
              }}
              linkStyle={{ }}
              divStyle={{ }}
     
        
          >
           <FontAwesomeIcon size="2x" icon={faClipboard}/>
        </CostumeLink>
            {children} 
           
      
        
          <ProfileControls/>
    </footer>    
     );
}

export default Footer;