import Colors from "../../lib/colors";
 import {   motion  } from "framer-motion";

import { Container, Heading , Flex, Box } from "@chakra-ui/react";


const Card = ({text,IconEl  }) => {
  return (
      <motion.div
        initial={{ opacity: 0, y: 30 }} 
        whileInView={{ opacity: 1, y: 0 }} 
        transition={{ duration: 1.5 , delay:0.1}}
        viewport={{ once: false, amount: 0.4 }} 
       >
       <Flex 
          p={4} 
          m={4}
          height={"500px"} 
          width={"280px"} 
          direction={"column"} 
          justifyContent={"center"} 
          alignItems={"center"}  
          boxShadow={'0 8px 16px rgba(0, 0, 0, 1)'}
          borderRadius={7}
          
          >
           <IconEl  size={"11em"} color={Colors.d}/>
            <Box height={"15%"}></Box> {/* paddingbox  */}
           <Heading p={4} fontSize={"2xl"} textAlign={"center"}>{text}</Heading>
      </Flex>
      
      </motion.div>
  );
};

export default Card
