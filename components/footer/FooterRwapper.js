// Nav Wrapper
// Nav Wrapper
// Nav Wrapper
// Nav Wrapper
"use client"
import react,{useEffect, useState } from "react";
import ProfileControls from "@/components/NextAuth/ProfileControls"
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome"
import {faHouse , faBroom , faPerson , faClipboard }from "@fortawesome/free-solid-svg-icons"
import { useSession } from "next-auth/react";
import CostumeLink from "@/components/Footer/CostumeLink";
import { useRouter } from "next/router";

const FooterRwapper = ()  => {

  const { data: session ,status ,update} = useSession()
  const router = useRouter()


    return ( 
         <footer
            className="footer-wrapper" 
           >
         <div className="links-Wrapper" 
         >
         {
          status==="authenticated"?
           <>
           <CostumeLink
             href={"/"}
             text={"בית"}
             index={1}
             >
             <FontAwesomeIcon size="1x" icon={faHouse} /> 
          </CostumeLink> 
          
          <CostumeLink
            href={"board"}
            text="לוח"
          >
        <FontAwesomeIcon size="1x" icon={faClipboard}/>
        </CostumeLink>

        <CostumeLink  
              text={"משק"}
              href="/vendor"
              index={2}
              >
              <FontAwesomeIcon size="1x" icon={faBroom} />
          </CostumeLink>

          <CostumeLink
                href="/costumer"
                text={"לקוח"}
                index={3}             
                >
                 <FontAwesomeIcon size="1x" icon={faPerson} />
          </CostumeLink> 
           </>
          : 
           <>
        <CostumeLink
             href={"/"}
             text={"בית"}
             index={1}
             >
             <FontAwesomeIcon size="1x" icon={faHouse} /> 
          </CostumeLink> 
               <CostumeLink
            href={"board"}
            text="לוח"
          >
        <FontAwesomeIcon size="1x" icon={faClipboard}/>
        </CostumeLink>
   

          </>
          }
         



        </div>
        
          <ProfileControls/>
        </footer>    
     );
}

export default FooterRwapper;