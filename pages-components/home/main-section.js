import React, {  useContext } from "react";
import { WindowWidthContext } from "../../context";
import StyledImage from "./styled-image";
import SlidingTextWrapper from './sliding-text'
import Colors from "../../lib/colors";
import AnimatedHeadline from './animated-headline'


import MD1 from '../../public/800px/cover1.jpg'
import MD2 from '../../public/800px/cover2.jpg'
import MD3 from '../../public/800px/cover3.jpg'
import MD4 from '../../public/800px/cover4.jpg'
import MD5 from '../../public/800px/cover5.jpg'


const PhotosMd = {
   A:[MD1,MD2,MD3,MD4,MD5]
}



function  MainSection() {
  const { xl, lg , md , sm } = useContext(WindowWidthContext);

  const Style = { 
      Wrapper:{
          width:"inherit",
          display:'flex',
          flexDirection:'column',
          justifyContent:'center',
          alignItems:'center',
          alignContent:'center',
          overflow:"clip"
         },   
      HeadLine: {
          fontSize: "5em",
          color: Colors.c,
          fontWeight: "bold",
      },   
      }
  
  return (

        <div  style={Style.Wrapper}>
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
                  timer={13000}  />
              <SlidingTextWrapper/> 

      </div>
  );

}

export default MainSection;










