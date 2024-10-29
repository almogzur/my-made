import Image from "next/image"
import Logo from '../../public/dark-logo.webp'
import LoginButton from "../../components/profile-controls/log-in-button"
import OrdersButton from "./go-to-orders-button"
import Colors from "../../lib/colors"


const Menu = () => {
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
          
          
        }
    }
     return (
        <nav style={Style.Wrapper}  >
        <div style={Style.colA} >
          <Image style={{ height:"inherit", width:"80px"}}  src={Logo } />
        </div>
        
        <div style={Style.colB} >
           <LoginButton StyleProps={{}} text={"כניסה | הרשמה "}/>
           <OrdersButton/>

        </div>
        </nav>
  )
}
export default Menu




