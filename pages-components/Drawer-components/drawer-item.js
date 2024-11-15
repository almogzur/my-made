 import {  motion } from "framer-motion";
import Colors from "../../lib/colors";
import { Flex ,Text } from "@chakra-ui/react";
import Link from "next/link";

const DrawerItem = ({ text  , Icon , PropsOnClick , animationIndex } ) => {


    return     <motion.div 
                  tabIndex={1}
                  initial={{ opacity: 0, y:0  , x : 300 }}
                  animate={{ opacity: 1, y: 0 , x:0}}
                  transition={{ duration: animationIndex , type:"spring" , }}
                  whileInView={{ opacity: 1, y: 0 }}
                  whileHover={{ scale: 1.1, boxShadow: "0px 6px 16px rgba(0, 0, 0, 0.5)" , color:Colors.c}} 
                  onClick={PropsOnClick}
                 >
                   <Flex 
                    justifyContent="space-between"
                    alignItems={"center"}
                    height={"60px"} 
                    borderRadius={"3px"} 
                    fontSize={"16px"} 
                    boxShadow={ "0px 4px 12px rgba(0, 0, 0, 0.5)"}
                    cursor={"pointer"}
                    p={1}
                    
                   
                    mt={2}
                    >
                   {Icon}
                   <Text p={4}>{text}</Text>
                  </Flex>

              </motion.div>
  } 
  export default DrawerItem