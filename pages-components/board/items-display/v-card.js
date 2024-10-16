import { useSession } from 'next-auth/react'
import {useEffect,useState} from 'react'
import { useRouter } from 'next/router'
import Link from 'next/link'
import Colors from '../../../lib/colors'
import { CiCalendarDate } from "react-icons/ci";
import { CiPhone } from "react-icons/ci";
import { CiMap } from "react-icons/ci";
import { FaWarehouse } from "react-icons/fa";
import { PiBathtubDuotone } from "react-icons/pi";
import { IoIosBed } from "react-icons/io";
import { FaMoneyBill } from "react-icons/fa";
import { IoMdPerson } from "react-icons/io";

const Style = {
    Wrapper:{
        width:"100%",
        height:"80px",
        boxShadow: ` 0px 0px 0px 1px   ${Colors.c}`,
        marginTop:"10px",
        borderRadius:"2px",
        display:'flex',
        

    },
    Box:{
        borderLeft:` 0.5px solid ${Colors.c} `,

        alignContent:"center",
        justifyContent:"center",
    },
    Test:{
        width:"90%",
        display:'flex',
        flexDirection:'row',   

    },
    TextChildren:{
        width:"50%",
        margin:"2px",

  
    },
    ListItem:{

    },
    CardBotText:{ margin:"0px",padding:"2px" , }
}



const Vcard=()=>{

  const router = useRouter()
  const { data: session ,status ,update} = useSession()


    if (status === 'loading') {
     return <h1 style={{textAlign:'center'}}>Loading...</h1>
}

return (
    <Link href={""} style={{textDecoration:"none"}}>
     <div /*wraper*/  
        style={Style.Wrapper}    
     >
        <div /*box */
          style={Style.Box}
        >תיאור הזמנה

        </div>
        <div /**text */
            style={Style.Test}
        >
         <div style={Style.TextChildren}  >
            
          <h5 style={Style.CardBotText} >{<CiPhone />}0524638610</h5>
          <h5 style={Style.CardBotText} >{<IoMdPerson />}אלמוג צור</h5>

          <h5 style={Style.CardBotText}>{<CiCalendarDate/>}{"תאריך"} </h5>          
          <h5 style={Style.CardBotText}>{<CiMap/>} {"כתובת"}</h5>
      

            
             <br/>
            
         </div>

         <div style={Style.TextChildren}  >
         <h5 style={Style.CardBotText}>{<FaWarehouse/>} מטר</h5>
          <h5 style={Style.CardBotText}> {<PiBathtubDuotone/>} 4</h5>
          <h5 style={Style.CardBotText} >{<IoIosBed/>} 3</h5>
          <h5 style={Style.CardBotText} >{<FaMoneyBill/>} 300</h5>
         </div>

        </div>
        

    </div> 
  </Link>
) 
}

export default Vcard