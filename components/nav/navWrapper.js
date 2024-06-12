// Nav Wrapper
// Nav Wrapper
// Nav Wrapper
// Nav Wrapper
"use client"
import react,{useEffect, useState } from "react";
import ProfileControls from "components/nav/ProfileControls"
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome"
import {faHouse , faBroom , faPerson , faClipboard }from "@fortawesome/free-solid-svg-icons"
import CostumeLink from "components/nav/CostumeLink";

const NavigationMenu = ()  => {

    return ( 
         <nav
            className="nav-wrapper" 
           >
         <div className="links-Wrapper" 
         >
          <CostumeLink
             href={"/"}
             text={"בית"}
             index={1}
             >
             <FontAwesomeIcon size="1x" icon={faHouse} /> 
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

          <CostumeLink
            href={"board"}
            text="לוח"
          >
        <FontAwesomeIcon size="1x" icon={faClipboard}/>
        </CostumeLink>
        </div>
        
          <ProfileControls/>
        </nav>    
     );
}

export default NavigationMenu;