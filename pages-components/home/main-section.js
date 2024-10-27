import React, { useState, useEffect , useContext } from "react";
import { WindowWidthContaxt } from "../../context";
import Colors from "../../lib/colors";
import { useSession } from "next-auth/react"
import CoverMD from '../../public/home-page/cover-md.jpg'
import CoverSM from '../../public/home-page/cover-sm.jpg'
import Image from "next/image";




function rotateSrc(srcArray, interval, callback) {



  let index = 0;

  // Set up an interval to rotate strings every 'interval' milliseconds
  setInterval(() => {
    // Execute the callback with the current string
    callback(srcArray[index]);

    index = (index + 1) % srcArray.length;
  }, interval);
}

const CopyText = {
   Headline : "MadeIt", 
   AdText : `צריכים עוזרת ?`,
  
}


function  Main() {
  const { large, medium ,small } = useContext(WindowWidthContaxt);
  
  const Style = {
      Wrapper:{ 
     
        display:'flex',
        flexDirection:'column',
        justifyContent:'center',
        alignItems:'center',
        alignContent:'center', 
      },
      image:{
        
      }

  }


  return (
   

       <div style={Style.Wrapper}>
          <Image  style={{ width:"100%"  , height:large? "50em" : "30em" , objectFit:"fill"}} src={large? CoverMD : CoverSM} />
          
        <h1 style={{}}>{ ""}</h1>

      </div>
  );
}

export default Main;
