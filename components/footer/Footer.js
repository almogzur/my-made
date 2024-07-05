// Nav Wrapper
// Nav Wrapper
// Nav Wrapper
// Nav Wrapper

import react,{useContext, useEffect } from "react";
import ProfileControls from "@/components/NextAuth/ProfileControls"
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome"
import { faHome, faClipboard } from "@fortawesome/free-solid-svg-icons";
import CostumeLink from "@/components/Footer/CostumeLink";
import { motion } from "framer-motion";

const FooterRwapper = ({children,style,className})  => {



    return ( 
    <motion.footer
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
    </motion.footer>    
     );
}

export default FooterRwapper;