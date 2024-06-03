// Nav Wrapper
// Nav Wrapper
// Nav Wrapper
// Nav Wrapper
"use client"
import Link from "next/link";
import react, {  useEffect, useState } from "react";
import ProfileControls from "components/nav/ProfileControls"

 

const NavigationMenu = ()  => {

    const [isCollaps,setIsCollap] = useState(false)
 
    const BuregerStyle = {
       wrap:{
         
       },  
    } 
    const style= {
        wrap:{
          width:"100%",
          height:"60px",
          background:"lightblue",
          display:"flex"
        },
        link:{
          margin:"20px",
          textDecoration:"none"
        }
    }

    return ( 
        <>
        <nav
        style={isCollaps ? BuregerStyle.wrap : style.wrap}
      >
        <Link  style={style.link} href={"home"}>בית</Link>
        <Link  style={style.link} href={"/vender"}>מנקה</Link>
        <Link  style={style.link} href={"costumer"}> לקוח </Link>

        <ProfileControls/>
       </nav>
      </>
      
     );
}

export default NavigationMenu;