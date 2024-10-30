

import Colors from "../../lib/colors"
import { useRouter } from "next/router";
import { GiVacuumCleaner } from "react-icons/gi";
import MyDrawer from './Drawer-components/my-drawer'


const SideBard = () => {

  const router = useRouter()


    const Style = {
       Wrapper:{
            display:"flex",
            height:"70px",
            background:Colors.d           
       }
      }

    return (
        <div style={Style.Wrapper}>
          <MyDrawer/>
          <span style={{position:"absolute" , left:"10px" , color:"#fff"}}> <GiVacuumCleaner size={"4em"}/> </span>

        </div>
      
    )
  }
  
  export default SideBard



  