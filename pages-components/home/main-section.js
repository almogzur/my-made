import React, {  useContext } from "react";
import { WindowWidthContaxt } from "../../context";
import StyledImage from "./styled-image";
import SlidingTextWrapper from './SlidingText'
import Colors from "../../lib/colors";

import Cover1 from '../../public/home-page/cover1.jpg'
import Cover2 from '../../public/home-page/cover2.jpg'
import Cover3 from '../../public/home-page/cover3.jpg'
import Cover4 from '../../public/home-page/cover4.jpg'
import Cover5 from '../../public/home-page/cover5.jpg'
import Cover6 from '../../public/home-page/cover6.jpg'
import Cover7 from '../../public/home-page/cover7.jpg'
import Cover8 from '../../public/home-page/cover8.jpg'
import Cover9 from '../../public/home-page/cover9.jpg'

const Photos = {
  A:[Cover1,Cover2,Cover3],
  B:[Cover4,Cover5,Cover6],
  C:[Cover7,Cover8,Cover9]

}



function  Main() {
  const { large, medium ,small } = useContext(WindowWidthContaxt);

  const Style = {
      Wrapper:{ 
         height: large? "40em": "35em",
         display:'flex',

  


      },
      A:{ 
         width:"50%" ,
         display:'flex',
         flexDirection:'column',
         justifyContent:'space-around',
         alignItems:'center',


        },
      B:{
         width:"50%",
         display:'flex',
         flexDirection:'column',
         justifyContent:'space-evenly',
        
        
        },
  }


  return (
   

       <div style={Style.Wrapper}>
        <div style={Style.A}  >     
             <StyledImage Images={Photos.A} PropsImageStyle={{borderRadius:"15px", width:"19em"}} timer={15000}  />
             <StyledImage Images={Photos.B} PropsImageStyle={{borderRadius:"8px" ,}} timer={19000}  />
        </div>

        <div  style={Style.B}>
             <StyledImage Images={Photos.C} PropsImageStyle={{height:"90%", marginTop:"5em" ,borderRadius:"12px"}} timer={13000}  />
             <SlidingTextWrapper/>
        </div>
      </div>
  );

}

export default Main;







