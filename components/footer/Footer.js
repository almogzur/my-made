// Nav Wrapper
// Nav Wrapper
// Nav Wrapper
// Nav Wrapper

import react,{useContext, useEffect } from "react";
import ProfileControls from "@/components/NextAuth/ProfileControls"
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome"
import { faHome, faClipboard } from "@fortawesome/free-solid-svg-icons";
import CostumeLink from "@/components/Footer/CostumeLink";

const FooterRwapper = ({children})  => {



    return ( 
         <footer
            className="footer-wrapper" 
           >
         <CostumeLink
            href={"/"}
            linkClassName={"footer-link"}
            divClassName={"inner-link-wrapper"}
           >
            <FontAwesomeIcon icon={faHome} size={"2x"} />
         </CostumeLink>

         <CostumeLink
              href={"/board"}
     
              linkClassName={"footer-link"}
              divClassName={"inner-link-wrapper"}
          >
           <FontAwesomeIcon size="2x" icon={faClipboard}/>
        </CostumeLink>
            {children} 
           
      
        
          <ProfileControls/>
        </footer>    
     );
}

export default FooterRwapper;