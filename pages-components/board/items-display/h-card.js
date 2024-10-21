import { useSession } from 'next-auth/react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import Colors from '../../../lib/colors';
import { CiCalendarDate, CiPhone } from "react-icons/ci";
import { FaWarehouse } from "react-icons/fa";
import { PiBathtubDuotone } from "react-icons/pi";
import { IoIosBed, IoMdPerson } from "react-icons/io";
import { useEffect } from 'react';
import { FaCity, FaMoneyBill1Wave } from "react-icons/fa6";
import { IoLocation } from "react-icons/io5";
import { color } from 'framer-motion';
import { background } from '@chakra-ui/react';

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
      color:Colors.text
      

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


    useEffect(()=>{
      console.log(OrderData);
      
    },[OrderData])

    if (status === 'loading') {
        return <h1 style={{ textAlign: 'center' }}>Loading...</h1>;
    }

    return (
      <Link href={""} style={Style.Wrapper}>

      <div style={Style.HedlineBox}>
          
   
          <FaMoneyBill1Wave color={Colors.d} size={"3em"} /> 
         
          <span style={{textAlign:"center"}} > {" מחיר לשעת ניקיון" }

           <br/> {OrderData?.orderPrice}
          </span>
       

      </div>
        <div style={Style.Text}>
          <div style={Style.TextChildren}>
              <div style={Style.CardBotText}><CiPhone size={"1.3em"} /> {OrderData?.orderPhone}</div>
              <div style={Style.CardBotText}><IoMdPerson size={"1.3em"} /> {OrderData?.userName}</div>
              <div style={Style.CardBotText}><CiCalendarDate size={"1.3em"} /> {new Date(OrderData?.ResurveDate).toLocaleDateString('he-IL')}</div>
              <div style={Style.CardBotText}><IoLocation size={"1.3em"} /> {OrderData?.addres}</div>
              <div style={Style.CardBotText}><FaWarehouse size={"1.3em"} /> {OrderData?.ApartmentRoomsNumber} </div>
              <div style={Style.CardBotText}><PiBathtubDuotone size={"1.3em"} /> {OrderData?.NumberOfBaths} </div>
              <div style={Style.CardBotText}><IoIosBed size={"1.3em"} /> {OrderData?.ApartmentRoomsNumber} </div>
          </div>
      </div>
  </Link>
  
    );
};

export default Vcard;
