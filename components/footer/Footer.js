// Nav Wrapper
// Nav Wrapper
// Nav Wrapper
// Nav Wrapper


import {FontAwesomeIcon} from "@fortawesome/react-fontawesome"
import { faHome, faClipboard } from "@fortawesome/free-solid-svg-icons";
import CostumeLink from "../CostumeLink/CostumeLink";
import ProfileControls from "@/components/NextAuth/ProfileControls";


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