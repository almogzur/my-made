import { useSession } from 'next-auth/react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import Colors from '../../../lib/colors';
import { CiCalendarDate, CiPhone } from "react-icons/ci";
import { FaWarehouse, FaRestroom } from "react-icons/fa";
import { PiBathtubDuotone } from "react-icons/pi";
import {  IoMdPerson } from "react-icons/io";
import { useEffect } from 'react';
import {  FaMoneyBill1Wave } from "react-icons/fa6";
import { IoLocation } from "react-icons/io5";
import { MdOutlineBedroomChild } from "react-icons/md";


const Style = {
  Wrapper: {
      width: "40%",
      height: "300px",
      boxShadow: `0px 0px 0px 1px ${Colors.c}`,
      marginTop: "10px",
      borderRadius: "2px",
      display: 'flex',
      textDecoration: "none", 
      cursor: "pointer",
      flexDirection:'column',
      margin:"7px",
      color:Colors.text,
      boxShadow: "0px 6px 10px rgba(0, 0, 0, 0.5)",  


  },
  HedlineBox: {
      height:"30%", 
      borderLeft: `0.5px solid ${Colors.c}`,
      background:Colors.a,
        display:'flex',
        flexDirection:'column',
        justifyContent:'center',
        alignItems:'center',

  },
  Text: {
       height:"inherit",
       display: 'flex',
       flexDirection: 'row',
       justifyContent:"space-around",
       paddingTop:"0.5em",
       background:Colors.c
       
  },
  TextChildren: {
  
  

  },
  CardBotText: {
   
      margin: "0px",
      padding: "2px",

 
  }
};

const Vcard = ({ OrderData }) => {
    const router = useRouter();
    const { data: session, status } = useSession();
    const na = "N/A"


    useEffect(()=>{
 //     console.log(OrderData);
      
    },[OrderData])

    if (status === 'loading') {
        return <h1 style={{ textAlign: 'center' }}>Loading...</h1>;
    }

    return (
      <Link href={""} style={Style.Wrapper}>

      <div style={Style.HedlineBox}>
          
   
         
          <span style={{textAlign:"center"}} > {" מחיר לשעת ניקיון" }
           <br/>          
            {OrderData?.orderPrice + " ש״ח" || na}
          </span>
       

      </div>
        <div style={Style.Text}>
          <div style={Style.TextChildren}>
              <div style={Style.CardBotText}><CiPhone size={"1.3em"} /> {OrderData?.orderPhone}</div>
              <div style={Style.CardBotText}><IoMdPerson size={"1.3em"} /> {OrderData?.userName}</div>
              <div style={Style.CardBotText}><CiCalendarDate size={"1.3em"} /> {new Date(OrderData?.ResurveDate).toLocaleDateString('he-IL') ||na}</div>
              <div style={Style.CardBotText}><IoLocation size={"1.3em"} /> {OrderData?.addres || na }</div>
              <div style={Style.CardBotText}><FaWarehouse size={"1.3em"} /> {OrderData?.ApartmentRoomsNumber ||na} </div>
              <div style={Style.CardBotText}><FaRestroom size={"1.3em"} /> {OrderData?.NumberOfBaths|| na} </div>
              <div style={Style.CardBotText}><MdOutlineBedroomChild size={"1.3em"} /> {OrderData?.ApartmentRoomsNumber ||na  } </div>
          </div>
      </div>
  </Link>
  
    );
};

export default Vcard;
