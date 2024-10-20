import { useSession } from 'next-auth/react'
import {useEffect,useState} from 'react'
import { useRouter } from 'next/router'
import Link from 'next/link'
import Colors from '../../../lib/colors'
import { useMediaQuery } from 'usehooks-ts'


import { CiCalendarDate } from "react-icons/ci";
import { CiPhone } from "react-icons/ci";
import { CiMap } from "react-icons/ci";
import { FaWarehouse } from "react-icons/fa";
import { PiBathtubDuotone } from "react-icons/pi";
import { IoIosBed } from "react-icons/io";
import { FaMoneyBill } from "react-icons/fa";
import { IoMdPerson } from "react-icons/io";



const HCard =({data})=>{

  const router = useRouter()
  const { data: session ,status ,update} = useSession()
  const tab = useMediaQuery(" (min-width: 600px)" )
  const laptop = useMediaQuery(" (min-width: 1100px) ")

  const Style = {
    LinkWrapper:{     
      textDecoration:"none",  
      width: laptop ? "20%" : tab ? "30% ": "44%",
      height: "260px",
      margin: "0.3em",
      border: `solid 1px black`,
      background:"#fff",
      padding:"5px"
    },
    CardTop:{height:"15%",margin:"5px"},
    CardBot:{height:"85%",overflow:"clip",lineHeight:"8px" },
    CardBotText:{ margin:"0px",padding:"5px"}


  }



    if (status === 'loading') {
     return <h1 style={{textAlign:'center'}}>Loading...</h1>
}


 
return (
   <Link href={""}
     style={Style.LinkWrapper}
        >
        <div 
          style={Style.CardTop}
        >
         תיאור העבודה: {""}
        </div>
        <div 
          style={Style.CardBot}
         >
    
          <h5 style={Style.CardBotText} >{<CiPhone />}0524638610</h5>
          <h5 style={Style.CardBotText}>{<CiCalendarDate/>}{"date"} </h5>          
          <h5 style={Style.CardBotText}>{<CiMap/>} {"addres"}</h5>
          <h5 style={Style.CardBotText}>{<FaWarehouse/>} טר</h5>
          <h5 style={Style.CardBotText}> {<PiBathtubDuotone/>} 4</h5>
          <h5 style={Style.CardBotText} >{<IoIosBed/>} 3</h5>
          <h5 style={Style.CardBotText} >{<FaMoneyBill/>} 300</h5>
          <h5 style={Style.CardBotText} >{<IoMdPerson />}אלמוג צור</h5>

        </div>




   </Link>
) 
}

export default HCard