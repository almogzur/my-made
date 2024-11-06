

import Colors from "../../lib/colors"
import { useRouter } from "next/router";
import { GiVacuumCleaner } from "react-icons/gi";
import MyDrawer from './Drawer-components/my-drawer'
import OrdersButton from "../../components/go-to-orders-button";
import {  Flex ,Text } from "@chakra-ui/react";
import { useSession } from "next-auth/react";

const MobNav = () => {

  const { data: session ,status ,update} = useSession()


    return (
        <Flex background={Colors.d} height={"70px"} >
          <MyDrawer/>
          <OrdersButton />
          <span  style={{position:"absolute" , left:"10px" , color:"#fff"}}> <GiVacuumCleaner size={"4em"}/> </span>  
          <Text>{session?.user.name}</Text>

        </Flex>
      
    )
  }
  
  export default MobNav



  