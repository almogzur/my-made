import { Container , Text  } from "@chakra-ui/react";

import {motion } from "framer-motion";

const AnimatedHeadline = ({ text, initia, animate, style, transition , fontWeight }) => {
    return (
    

        <motion.div 
            initial={initia }
            animate={animate }
            transition={transition}
            style={style}

        >
            <Container  >
           <Text fontWeight={fontWeight?? null}  >{text}</Text>
           </Container>
        </motion.div>
  
    );
};
export default AnimatedHeadline