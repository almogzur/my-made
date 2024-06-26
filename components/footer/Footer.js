// Nav Wrapper
// Nav Wrapper
// Nav Wrapper
// Nav Wrapper

import react,{useEffect, useState } from "react";
import ProfileControls from "@/components/NextAuth/ProfileControls"
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome"
import { faHome, faClipboard } from "@fortawesome/free-solid-svg-icons";
import { useSession } from "next-auth/react";
import CostumeLink from "@/components/Footer/CostumeLink";
import { useRouter } from "next/router";

const FooterRwapper = ({children})  => {

  const { data: session ,status ,update} = useSession()
  const router = useRouter()


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