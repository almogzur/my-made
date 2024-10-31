

import Colors from "../../lib/colors"
import { useRouter } from "next/router";
import { GiVacuumCleaner } from "react-icons/gi";
import MyDrawer from './Drawer-components/my-drawer'
import OrdersButton from "../../components/go-to-orders-button";

const MobNav = () => {

  const router = useRouter()


    const Style = {
       Wrapper:{
            display:"flex",
            height:"70px",
            background:Colors.d ,
            jusifyConten:"space-around"       
       }
      }

    return (
        <div style={Style.Wrapper}>
          <MyDrawer/>
          <OrdersButton />
          <span style={{position:"absolute" , left:"10px" , color:"#fff"}}> <GiVacuumCleaner size={"4em"}/> </span>

        </div>
      
    )
  }
  
  export default MobNav



  