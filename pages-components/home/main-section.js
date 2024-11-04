import React, {  useContext } from "react";
import { WindowWidthContext } from "../../context";
import StyledImage from "./styled-image";
import SlidingTextWrapper from './sliding-text'
import Colors from "../../lib/colors";
import { Flex } from "@chakra-ui/react";


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
  const { xl, lg , md , sm } = useContext(WindowWidthContext);

  const Style = { 
   
    
      HeadLine: {
          fontSize: "5em",
          color: Colors.c,
          fontWeight: "bold",
      },   
      }
  
  return (

        <Container p={2}  >
            <SlidingTextWrapper/> 
            <Flex direction={"column"} alignItems={"center"}  >
              <StyledImage 
                  Images={ PhotosMd.A } 
                  PropsImageStyle={{ 
                    width:"800px", 
                      height:"600px",  
                       borderRadius: lg ? "12px" : null ,
                        objectFit:"fill" ,
                         margin: lg? "2em" : null  ,
                         opacity: "0.8"
                           }} 
                  timer={8000} 
                   />
                  
              </Flex>

      </Container>
  );

}

export default MainSection;










