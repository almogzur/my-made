

import Colors from "../../lib/colors"
import { useRouter } from "next/router";
import { GiVacuumCleaner } from "react-icons/gi";
import MyDrawer from './Drawer-components/my-drawer'
import OrdersButton from "../../components/go-to-orders-button";
import { Container , Flex } from "@chakra-ui/react";

const MobNav = () => {

  const router = useRouter()


    return (
        <Flex background={Colors.d} height={"70px"} >
          <MyDrawer/>
          <OrdersButton />
          <span  style={{position:"absolute" , left:"10px" , color:"#fff"}}> <GiVacuumCleaner size={"4em"}/> </span>

        </Flex>
      
    )
  }
  
  export default MobNav



  