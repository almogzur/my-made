import React, {  useContext } from "react";
import { WindowWidthContext } from "../../context";
import PhotoCarousel from "./photos-carousel";
import { Flex, Box , Heading,BlockquoteIcon ,Float,Circle, Center  } from "@chakra-ui/react";
import { AnimatePresence, delay, motion } from 'framer-motion';
import MD1 from '../../public/800px/cover1.jpg'
import MD2 from '../../public/800px/cover2.jpg'
import MD3 from '../../public/800px/cover3.jpg'
import MD4 from '../../public/800px/cover4.jpg'
import MD5 from '../../public/800px/cover5.jpg'


const Photos = [MD1,MD2,MD3,MD4,MD5]




function  MainSection() {
  const { xxl,xl,lg,md,sm,xs,xxs } = useContext(WindowWidthContext);

  return (
    
   
        <motion.div 
          initial={{height:0 , opacity:0}} 
          animate={{height:"auto" , opacity:1}} 
          style={{background:"", }}
          
          transition={{
           height:{ duration:3 },
           opacity:{     duration: 2, delay:"2" },
           }
          
          }
            >

         <Heading 
            textAlign={"center"} 
            fontSize={!xs?"2xl":"5xl"} 
            fontWeight={"bolder"} 
            p={4}
            lineHeight={"normal"}

             >  
              {"צריכים עזרה בניקיון הבית ? הרשמו עכשיו !! תיאום קל ופשוט."}
        </Heading>
          <Flex justifyContent={"center"} h={xs? 600 :400 } >
           <PhotoCarousel Photos={Photos} />
       </Flex>


      </motion.div>




  );

}

export default MainSection;









