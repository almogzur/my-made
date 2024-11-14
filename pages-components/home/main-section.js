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
      <LazyMotion features={f}>
        <m.div  initial={{height:0 , opacity:0}} animate={{height:"auto" , opacity:1}} transition={{
          height:{ duration:4, type:"spring", stiffness:10 },
           opacity:{     duration: 6  }
          }
          }  >

        <Heading 
            textAlign={"center"} 
            fontSize={!xs?"2xl":"5xl"} 
            fontWeight={"bolder"} 
            p={2}
            lineHeight={"normal"}
             >
              {"צריכים עוזר\ת בית ? הרשמו עכשיו !! תיאום קל ופשוט."}
            </Heading>


           <Container maxWidth={"900px"}>
            
          
        
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



        </Container>

      </m.div>
      </LazyMotion>


  );

}

export default MainSection;









