
import { useContext, useEffect } from 'react';

import Link from 'next/link';
import Colors from '../../../lib/colors';

import { CiCalendarDate, CiPhone } from "react-icons/ci";
import { FaWarehouse, FaRestroom } from "react-icons/fa";
import { IoLocation } from "react-icons/io5";
import { MdOutlineBedroomChild } from "react-icons/md";
import { IoMdPerson } from "react-icons/io";
import { WindowWidthContaxt,OrderContaxt } from '../../../context'



const Vcard = ({ OrderData }) => {
    const {xs , md , sm} = useContext(WindowWidthContaxt)
    const na = "N/A"
    const [orderContext , setOrderContext ] = useContext(OrderContaxt)
    
    const Style = {
      Wrapper: {
          width:   xs ? "40%" : sm? " 40% " : md ? "300px"  : "20%",

          marginTop: "5px",
          borderRadius: "2px",
          display: 'flex',
          textDecoration: "none", 
          cursor: "pointer",
          flexDirection:'column',
          margin:"10px",
          color:Colors.text,
          boxShadow: "0px 6px 10px rgba(0, 0, 0, 0.5)",  
    
    
      },
      HedlineBox: {

           borderLeft: `0.5px solid ${Colors.c}`,
           background:Colors.a,
            display:'flex',
            flexDirection:'column',
            justifyContent:'center',
            alignItems:'center',
            height:"80px"
    
      },
      CardBotText: {
    
 
          background:"red",
          display: 'flex',
          justifyContent:"space-between",
          paddingTop:"0.5em",
          background:Colors.c,
          width:"100%"
    
     
      }
    };

    return (
      <Link  href={`/board/order/${OrderData.orderId.slice(0,10)}`} 

         style={Style.Wrapper}
         onClick={()=> setOrderContext(OrderData)}
         >

           <div style={Style.HedlineBox}>
          <span style={{textAlign:"center"}} > {" מחיר לשעת ניקיון" }
           <br/>          
            {OrderData?.orderPrice + " ש״ח" || na}
          </span>
       

           </div>
           <div style={Style.TextChildren }>
              <div style={Style.CardBotText}><CiPhone size={"1.3em"} /> {OrderData?.orderPhone}</div>
              <div style={Style.CardBotText}><IoMdPerson size={"1.3em"} /> {OrderData?.userName}</div>
              <div style={Style.CardBotText}><CiCalendarDate size={"1.3em"} /> {new Date(OrderData?.ResurveDate).toLocaleDateString('he-IL') ||na}</div>
              <div style={Style.CardBotText}><IoLocation size={"1.3em"} /> {OrderData?.addres || na }</div>
              <div style={Style.CardBotText}><FaWarehouse size={"1.3em"} /> {OrderData?.ApartmentRoomsNumber ||na} </div>
              <div style={Style.CardBotText}><FaRestroom size={"1.3em"} /> {OrderData?.NumberOfBaths|| na} </div>
              <div style={Style.CardBotText}><MdOutlineBedroomChild size={"1.3em"} /> {OrderData?.ApartmentRoomsNumber ||na  } </div>
          </div>


     </Link>
  
    );
};

export default Vcard;
