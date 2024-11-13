import React, {  useContext } from "react";
import { WindowWidthContext } from "../../context";
import StyledImage from "./styled-image";
import { Flex, Box , Heading,BlockquoteIcon ,Float,Circle, Center  } from "@chakra-ui/react";
import {Blockquote} from '../../components/ui/blockquote'
import { LuQuote } from "react-icons/lu"

import {m, LazyMotion } from 'framer-motion'
import f from '../../lib/features'
import MD1 from '../../public/800px/cover1.jpg'
import MD2 from '../../public/800px/cover2.jpg'
import MD3 from '../../public/800px/cover3.jpg'
import MD4 from '../../public/800px/cover4.jpg'
import MD5 from '../../public/800px/cover5.jpg'
import { Container } from "@chakra-ui/react";
import { BsQuestion } from "react-icons/bs";

const PhotosMd = [MD1,MD2,MD3,MD4,MD5]




function  MainSection() {
  const { xxl,xl,lg,md,sm,xs,xxs } = useContext(WindowWidthContext);
  
  return (

        <Container  >
          <LazyMotion features={f}>
           <m.div  initial={{x:-300}} animate={{x:0}} transition={{ease: "easeOut", duration: 2 ,stiffness:100 }}  >
           <Container maxWidth={"900px"}>
            
          <Heading textAlign={"center"} fontSize={!xs?"2xl":!md?"4xl":"5xl"} fontWeight={300} p={!xs? 1 : !md? 5 : 6} m={1} lineHeight={!xs?1:!md?2:2} >  {"צריכים עוזר\ת בית ? הרשמו עכשיו !! תיאום קל ופשוט."}</Heading>

     
            
           </Container>

          </m.div>
         </LazyMotion>


          <Flex direction={"column"} alignItems={"center"}  >
              <StyledImage 
                  Images={ PhotosMd } 
                   PropsImageStyle={{ 
                   width: xxs && xs? "800px" : "400px", 
                   height:xxs && xs? "600px":"300px",  
                   marginTop:!xs? "1em ": "3em",
                   marginBottom: !xs? "1em ": "3em" ,
                   boxShadow:'0 8px 16px rgba(0, 0, 0, 1)'
                            }} 
                   timer={8000} 
                   />
          </Flex>


      </Container>
  );

}

export default MainSection;










