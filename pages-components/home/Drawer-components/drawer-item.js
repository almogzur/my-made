 import {  motion } from "framer-motion";
import Colors from "../../../lib/colors";
import { Flex } from "@chakra-ui/react";

const DrawerItem = ({ text , children , propsStyle  , PropsOnClick  } ) => {

    const Style = {
            Wrapper: {
                 
      
                    justifyContent:'space-between',
                    alignItems:'center',  
                    marginTop:"10px",
                    padding:"5px"
}
    }

    return     <motion.button 
                  initial={{ opacity: 0, y:0  , x : 300 }}
                  animate={{ opacity: 1, y: 0 , x:0}}
                  transition={{ duration: 1 , delay:0.1 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  whileHover={{ scale: 1.1, boxShadow: "0px 6px 16px rgba(0, 0, 0, 0.5)" , color:Colors.c}} 
                  style={{border:"none" , width:"100%"}}
                 onClick={PropsOnClick?? null}

             
                 >
                 <Flex 
                    justifyContent="space-between"
                    alignItems={"center"}
                    height={"60px"} 
                    fontWeight={600} 
                    borderRadius={"3px"} 
                    background={Colors.d}
                    color={"#fff"} 
                    fontSize={"16px"} 
                    boxShadow={ "0px 4px 12px rgba(255, 255, 255, 0.1)"}
                    cursor={"pointer"}
                    p={1}
                    mt={3}
                    style={propsStyle?? null}
                    >
                  {children}
                  {text}
                 </Flex>

              </motion.button>
  } 
  export default DrawerItem