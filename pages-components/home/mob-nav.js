

import Colors from "../../lib/colors"
import { useRouter } from "next/router";
import { GiVacuumCleaner } from "react-icons/gi";
import MyDrawer from './Drawer-components/my-drawer'
import OrdersButton from "../../components/go-to-orders-button";
import {  Flex ,Text , Box, Button} from "@chakra-ui/react";
import { useSession } from "next-auth/react";
import ProfileLink from "../../components/profile-controls/profile-link";
import LoginButton from "../../components/profile-controls/log-in-button";

const MobNav = () => {

  const { data: session ,status ,update} = useSession()


    return (
        <Flex  background={Colors.d}  height={"80px"}  >
          <MyDrawer/>
          <Box color={Colors.b} position={"absolute"} left={"5px"} p={2}  ><GiVacuumCleaner size={"4em"}/> </Box>  
        </Flex>
      
    )
  }
  
  export default MobNav



  