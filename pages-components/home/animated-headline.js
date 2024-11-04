import { Container , Text  } from "@chakra-ui/react";

import {motion } from "framer-motion";

const AnimatedHeadline = ({ text, initia, animate, style, transition , fontWeight }) => {
    return (
    
    <Container  >
        <motion.div 
            initial={initia }
            animate={animate }
            transition={transition}
            style={style}

        >
           <Text fontWeight={fontWeight?? null}  >{text}</Text>
        </motion.div>
        </Container>
    );
};
export default AnimatedHeadline