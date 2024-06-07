// Nav Wrapper
// Nav Wrapper
// Nav Wrapper
// Nav Wrapper
"use client"
import Link from "next/link";
import react, {  useEffect, useState } from "react";
import ProfileControls from "components/nav/ProfileControls"
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome"
import {faHouse , faBroom , faPerson }from "@fortawesome/free-solid-svg-icons"

const CLink =({href,children,text,index})=>{
    return (
      <div className="c-div">
     
        <Link 
           style={{textDecoration:"none"}}
           href={href}
           >
          {[text,]}
    
        </Link>
        <br/>
        <div 
          style={{display:"flex",justifyContent:"center"}}
          >
        {children}
        </div>
      </div>
    )
}


const NavigationMenu = ()  => {

    const [isCollaps,setIsCollap] = useState(false)


 
  
    return ( 
         <nav
           className="NavWrapper"
         >
        <div className="linksWrapper" >
          <CLink
             href={"/"}
             text={"דף הבית"}
             index={1}
             key={1}
             >
             <FontAwesomeIcon size="1x" icon={faHouse} /> 
          </CLink>
          <CLink  
             text={"רישום נותן שירות"}
              href="/vendor"
              index={2}
              key={2}>
              <FontAwesomeIcon size="1x" icon={faBroom} />
          </CLink>
          <CLink
                href="/costumer"
                text={"לוח"}
                index={3}
                key={3}
                >
                 <FontAwesomeIcon size="1x" icon={faPerson} />
          </CLink> 
        </div>
          <ProfileControls/>
        </nav>    
     );
}

export default NavigationMenu;