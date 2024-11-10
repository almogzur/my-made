import Colors from "../lib/colors"
import { GiVacuumCleaner } from "react-icons/gi";
import MyDrawer from "./home/Drawer-components/my-drawer";
import {  Flex ,Text , Box, Button, Heading} from "@chakra-ui/react";
import { useSession } from "next-auth/react";
import { useContext } from "react";
import { WindowWidthContext } from "../context";



const MobNav = () => {

  const { xxl,xl,lg,md,sm,xs,xxs } = useContext(WindowWidthContext);
  const { data: session ,status ,update} = useSession()


    return (
        <Flex p={2} mb={3} background={Colors.d}  height={ !xs? "60px": !md? "70px" : null}  justifyContent={"space-between"} alignItems={"center"}   boxShadow={ "0px 6px 16px rgba(0, 0, 0, 0.5)"}  >
          <MyDrawer/>
          <Heading color={Colors.b}  fontSize={!xs ? "2em " :"3em "} >{"MadeIT"}</Heading>
          <Box color={Colors.b}  p={2}  ><GiVacuumCleaner size={"3em"}/> </Box>  
        </Flex>
      
    )
  }
  
  export default MobNav



  