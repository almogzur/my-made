import { Container , Heading, Text  } from "@chakra-ui/react";

import {motion } from "framer-motion";

const AnimatedHeadline = ({ text, initia, animate, style, transition , fontWeight }) => {
    return (
    

        <motion.div 
            initial={initia }
            animate={animate }
            transition={transition}
            style={style}

        >
           <Heading fontSize={ "2xl"} fontWeight={fontWeight?? null}  >{text}</Heading>
        </motion.div>
  
    );
};
export default AnimatedHeadline