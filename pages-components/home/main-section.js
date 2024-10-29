import React, {  useContext } from "react";
import { WindowWidthContaxt } from "../../context";
import StyledImage from "./styled-image";
import SlidingTextWrapper from './SlidingText'
import Colors from "../../lib/colors";

import C1 from '../../public/400px/cover1.jpg'
import C2 from '../../public/400px/cover2.jpg'
import C3 from '../../public/400px/cover3.jpg'
import C4 from '../../public/400px/cover4.jpg'
import C5 from '../../public/400px/cover5.jpg'
import C6 from '../../public/400px/cover6.jpg'
import C7 from '../../public/400px/cover7.jpg'
import C8 from '../../public/400px/cover8.jpg'
import C9 from '../../public/400px/cover9.jpg'
import MD1 from '../../public/800px/cover1.jpg'
import MD2 from '../../public/800px/cover2.jpg'
import MD3 from '../../public/800px/cover3.jpg'
import MD4 from '../../public/800px/cover4.jpg'
import MD5 from '../../public/800px/cover5.jpg'

const PhotosSm = {
  A:[C1,C2,C3],
  B:[C4,C5,C6],
  C:[C7,C8,C9]
}
const PhotosMd = {
   A:[MD1,MD2,MD3,MD4,MD5]
}



function  MainSection() {
  const { large , medium , small } = useContext(WindowWidthContaxt);

  const Style = {
      Wrapper:{ 
         height: large? "40em" : "30em",
         width:large? "80%" : "100%",
         display:'flex',
         flexDirection:'row',
         justifyContent:'center',
         justifySelf:"center",
         transition:"all ease 2s",
         overflow:"clip"
        },
      A:{ 
         width: large? "50%" : "0px",
         display:'flex',
         height:"100%",
         flexDirection:'column',
         justifyContent:'space-evenly',
          alignItems:'center',
        },
      B:{
          width:large ? "50%":"100%",  
          display:'flex',
          flexDirection:'column',
          justifyContent:'center',
          alignItems:'center',
          margin:"20px",
          },
  }


  return (
       <div style={Style.Wrapper}>

       { medium? <div style={Style.A}  >     
             <StyledImage Images={PhotosSm.A} PropsImageStyle={{borderRadius:"15px"}} timer={15000}  />
             <StyledImage Images={PhotosSm.B} PropsImageStyle={{borderRadius:"8px" ,}} timer={19000}  />
        </div>
        :null
        }

        <div  style={Style.B}>
             <StyledImage 
                  Images={ PhotosMd.A } 
                  PropsImageStyle={{ height: large? "" : "30em",    borderRadius:"12px" ,  }} 
                  timer={13000}  />
              <SlidingTextWrapper/> 
        </div>
      </div>
  );

}

export default MainSection;







