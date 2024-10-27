import LoginButton from "../../components/profile-controls/log-in-button"
import OrdersButton from "./go-to-orders-button"
import Logo from '../../public/dark-logo.webp'
import Link from "next/link"
import Image from "next/image"
import { useRouter } from "next/router"
import { WindowWidthContaxt } from '../../context'
import React, { useContext, useEffect } from 'react';
import Colors from "../../lib/colors"



const HomePageNavigation = () => {
    const { large, medium ,small } = useContext(WindowWidthContaxt);

    const Style = {
      width:"100%",
      height:"80px",
      background:Colors.d,
      display:"flex"
    }


    return (
        <nav style={Style}  >
            {large? <NormalMenu/> : <BurgerMenu/> }
        </nav>
    );
};




const NormalMenu = () => {
    const Style = {
        colA:{
         width:"50%",
         height:"inherit",

         
        },
        colB:{
             width:"50%",
             height:"inherit",
             display:'flex',
             flexDirection:'row',
             justifyContent:'space-evenly',
          
          
        }
    }
     return (
        <>
        <div style={Style.colA} >
          <Image style={{ height:"inherit", width:"80px"}}  src={Logo } />
        </div>
        
        <div style={Style.colB} >
           <LoginButton StyleProps={{}} text={"כניסה | הרשמה "}/>
           <OrdersButton/>

        </div>
        </>
  )
}





const BurgerMenu = () => {
    const Style = {}
 return (
    <div >
        <ul >
        <li>Home</li>
        <li>About</li>
        <li>Services</li>
        <li>Contact</li>
        {/* Add more menu items as needed */}
    </ul>
    </div>
    )
}




export default HomePageNavigation;
