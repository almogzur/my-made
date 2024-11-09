import React, {  useContext } from "react";
import { WindowWidthContext } from "../../context";
import StyledImage from "./styled-image";
import SlidingTextWrapper from './sliding-text'
import Colors from "../../lib/colors";
import { Flex, Bos } from "@chakra-ui/react";


import MD1 from '../../public/800px/cover1.jpg'
import MD2 from '../../public/800px/cover2.jpg'
import MD3 from '../../public/800px/cover3.jpg'
import MD4 from '../../public/800px/cover4.jpg'
import MD5 from '../../public/800px/cover5.jpg'
import { Container } from "@chakra-ui/react";


const PhotosMd = {
   A:[MD1,MD2,MD3,MD4,MD5]
}



function  MainSection() {
  const { xxl,xl,lg,md,sm,xs,xxs } = useContext(WindowWidthContext);
  
  return (

        <Container  >
            <SlidingTextWrapper/> 
            <Flex direction={"column"} alignItems={"center"}  >
              <StyledImage 
                  Images={ PhotosMd.A } 
                    PropsImageStyle={{ 
                      width: xxs && xs? "800px" : "400px", 
                      height:xxs && xs? "600px":"300px",  
                       marginTop:"1em",
                       marginBottom:"1em",
                       boxShadow:'0 8px 16px rgba(0, 0, 0, 1)'

                    
                           }} 
                  timer={8000} 
                   />
                  
              </Flex>

      </Container>
  );

}

export default MainSection;










