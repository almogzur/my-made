// Nav Wrapper
// Nav Wrapper
// Nav Wrapper
// Nav Wrapper

import react,{useEffect, useState } from "react";
import ProfileControls from "@/components/NextAuth/ProfileControls"
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome"
import { faHome } from "@fortawesome/free-solid-svg-icons";
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
         text={"בית"}
         linkClassName={"footer-link"}
         divClassName={"inner-link-wrapper"}
         >
          <FontAwesomeIcon icon={faHome} size="1x" />
         </CostumeLink>
            {children} 
      
        
          <ProfileControls/>
        </footer>    
     );
}

export default FooterRwapper;