import Colors from "../lib/colors"
import { GiVacuumCleaner } from "react-icons/gi";
import MyDrawer from "./Drawer-components/my-drawer";
import {  Flex ,Text , Box, Button, Heading} from "@chakra-ui/react";
import { useSession } from "next-auth/react";
import { useContext } from "react";
import { WindowWidthContext } from "../context";
import { useRouter } from "next/router";


const MobNav = () => {

  const { xxl,xl,lg,md,sm,xs,xxs } = useContext(WindowWidthContext);
  const { data: session ,status ,update} = useSession()
 const router = useRouter()

    return (
        <Flex
             p={1} 
             mb={3} 
             background={router.pathname === "/profile" ? Colors.b: Colors.d} 
             color={router.pathname === "/profile" ? "black": "red"}  
             height={ !xs? "60px": !md? "70px" : null} 
             justifyContent={"space-between"} 
             alignItems={"center"}  
             boxShadow={ "0px 6px 16px rgba(0, 0, 0, 0.5)"}  
             >
          <MyDrawer/>
          <Box  color={router.pathname === "/profile" ? "": Colors.a} p={2}  ><GiVacuumCleaner size={"3em"}/> </Box>  
        </Flex>
      
    )
  }
  
  export default MobNav



  