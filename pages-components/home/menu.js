import {useRouter} from "next/router"
import { useSession } from "next-auth/react";
import LoginButton from "../../components/profile-controls/log-in-button"
import OrdersButton from "../../components/go-to-orders-button"
import Colors from "../../lib/colors"
import ProfileLink from '../../components/profile-controls/profile-link'

import { GiVacuumCleaner } from "react-icons/gi";
import {  Flex } from "@chakra-ui/react";

const Menu = () => {

  const { data: session ,status } = useSession()
  const router = useRouter()

     return (
        <Flex height={"80px"}   background={Colors.d} >

           <Flex width={"50%"} height={"inherit"} background={Colors.d}>
            <GiVacuumCleaner size={"4em"} color="#fff"  /> 
          </Flex>
        
          <Flex  width={"50%"} height={"inherit"} justifyContent={"space-evenly"} alignItems={"center"} >
             { status && status === "authenticated" ? <ProfileLink/>   : <LoginButton />}
             <OrdersButton/>
          </Flex>

        </Flex>
  )
}
export default Menu




