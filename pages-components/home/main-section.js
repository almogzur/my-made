import React, { useState, useEffect , useContext } from "react";
import { WindowWidthContaxt } from "../../context";
import Colors from "../../lib/colors";
import { useSession } from "next-auth/react"
import Cover1 from '../../public/home-page/cover1.jpg'
import Cover2 from '../../public/home-page/cover2.jpg'
import Cover3 from '../../public/home-page/cover3.jpg'
import Cover4 from '../../public/home-page/cover4.jpg'
import Cover5 from '../../public/home-page/cover5.jpg'
import Cover6 from '../../public/home-page/cover6.jpg'
import Cover7 from '../../public/home-page/cover7.jpg'
import Cover8 from '../../public/home-page/cover8.jpg'
import Cover9 from '../../public/home-page/cover9.jpg'
import Image from "next/image";
import {m ,domAnimation,  LazyMotion } from "framer-motion"
import f from '../../lib/features'

const Photos = {
  A:[Cover1,Cover2,Cover3],
  B:[Cover4,Cover5,Cover6],
  C:[Cover7,Cover8,Cover9]

}

const CopyText = {
   Headline : "MadeIt", 
   AdText : `צריכים עוזרת ?`,
  
}


function  Main() {
  const { large, medium ,small } = useContext(WindowWidthContaxt);

  const [AImageSrc , setAImageSrc] = useState()
  const [BImageSrc , setBImageSrc] = useState()
  const [CImageSrc , setCImageSrc] = useState()

  

  
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
         flexDirection:'row'|'column',
         justifyContent:'center',
         alignItems:'center',
         alignContent:'center',
        },

      ImageA:{ 
         width:"70%",
         height:"40%",
         objectFit:"fill",
         borderRadius:"5px",
         margin:"15px",
         transition:"all ease 1s"
         
        } ,
      ImageB:{ 
        width:"90%",
        height:"40%",
        borderRadius:"15px",


      },
      ImageC:{
        margin:"10px",
        borderRadius:"15px",
      }


  }


  return (
   

       <div style={Style.Wrapper}>

        <div style={Style.A}  >
        
       


          <ImageRotator PropsStyle={Style.ImageA} Images={Photos.A} timer={5000} />
          <ImageRotator PropsStyle={Style.ImageB} Images={Photos.B} timer={800000} />
          
        </div>

        <div  style={Style.B}>
        <ImageRotator PropsStyle={Style.ImageC} Images={Photos.C} timer={500000} />

       </div>
        

      </div>
  );

}

export default Main;


let index = 0;

const ImageRotator = ({ Images, timer = 3000, PropsStyle }) => {


  const [ src , setSrc] = useState(Images[0])


  useEffect(() => {

    const intervalId = setInterval(() => {
      // Move to the next index and loop back if necessary
      index = (index + 1) % Images.length;
      setSrc(Images[index]); // Update the src state
    }, timer);

    // Clean up the interval on component unmount
    return () => clearInterval(intervalId);
  }, [Images, timer]);

  return (
    <LazyMotion features={domAnimation}>
      <m.div
        key={index} // key prop helps trigger re-render on image change
        initial={{ opacity: 0  }}
        animate={{ opacity: 1 }}

        transition={{
          opacity: { duration: 5 }, // Adjust duration as needed
          ease: "easeInOut",
        }}
        style={PropsStyle}
      >
        <Image  src={src} alt="Rotating" />
      </m.div>
    </LazyMotion>
  );
};





