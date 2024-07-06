// Nav Wrapper
// Nav Wrapper
// Nav Wrapper
// Nav Wrapper

import {FontAwesomeIcon} from "@fortawesome/react-fontawesome"
import { faHome, faClipboard } from "@fortawesome/free-solid-svg-icons";
import dynamic from "next/dynamic";
import LoadingSpinner from "../Loader/LoadingSpinner";

const CostumeLink = dynamic(() => import("../CostumeLink/CostumeLink"), {
  ssr: false, // Disable server-side rendering if not needed
  loading: () => <LoadingSpinner/>, // Optional loading component
});
const ProfileControls = dynamic(() => import("@/components/NextAuth/ProfileControls"), {
  ssr: false, // Disable server-side rendering if not needed
  loading: () => <LoadingSpinner/>, // Optional loading component
});

const FooterRwapper = ({children,style,className})  => {

    return ( 
    <footer
            style={style?style:null}
            className={className?className:null} 
           >
         <CostumeLink
            href={"/"}
           
           >
            <FontAwesomeIcon icon={faHome} size={"2x"} />
         </CostumeLink>

         <CostumeLink
              href={"/board"}
     
        
          >
           <FontAwesomeIcon size="2x" icon={faClipboard}/>
        </CostumeLink>
            {children} 
           
      
        
          <ProfileControls/>
    </footer>    
     );
}

export default FooterRwapper;