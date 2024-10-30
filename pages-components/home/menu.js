import {useRouter} from "next/router"
import { useSession } from "next-auth/react";
import LoginButton from "../../components/profile-controls/log-in-button"
import OrdersButton from "../../components/go-to-orders-button"
import Colors from "../../lib/colors"
import ProfileLink from '../../components/profile-controls/profile-link'

import { GiVacuumCleaner } from "react-icons/gi";

const Menu = () => {

  const { data: session ,status } = useSession()
  const router = useRouter()

    const Style = {
         Wrapper : {
            width:"100%",
            height:"80px",
            background:Colors.d,
            display:"flex"
          },
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
            alignItems:'center',
          
          
          
        }
    }
     return (
        <div style={Style.Wrapper}  >

           <div style={Style.colA} >
            <GiVacuumCleaner size={"5em"} color="#fff"  /> 
          </div>
        
          <div style={Style.colB} >
             { status && status === "authenticated" ? <ProfileLink/>   : <LoginButton />}
             <OrdersButton/>
          </div>

        </div>
  )
}
export default Menu




