import Link from 'next/link';
import Colors from '../../../lib/colors';
import { CiCalendarDate, CiPhone } from "react-icons/ci";
import { FaWarehouse, FaRestroom } from "react-icons/fa";
import { IoMdPerson } from "react-icons/io";
import { IoLocation } from "react-icons/io5";
import { MdOutlineBedroomChild } from "react-icons/md";
import { useContext } from 'react';
import { OrderContext ,FilterCityContext} from "../../../context"
import { Container } from '@chakra-ui/react';


const Style = {
  Wrapper: {
    borderRadius: "5px",
    display: 'flex',
    flexDirection: 'row',
    cursor: "pointer",
    textDecoration: "none",
    marginTop:"0.5em",
    boxShadow: "0px 6px 10px rgba(0, 0, 0, 0.5)",  

  },
  TopSection: {
    background: Colors.d,  // Background color for the top section
    
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    color: "#fff",
   
  },
  BottomSection: {
    
    padding: '5px',
    display: 'flex',
    justifyContent: 'space-around',
    
    color: Colors.text,
    width:"80%"
  },
  TextChildren: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
  },
  CardBotText: {
    display: 'flex',
    alignItems: 'center',
    margin: '5px 0',
    fontSize: '1rem',
  }
};

const Vcard = ({ OrderData }) => {

  const na = "N/A";

   const clickHendler = ()=>{
    setOrderContext(OrderData)
    setFilterCity(null)
   }

  const [orderContext , setOrderContext ] = useContext(OrderContext)
  const [filterCity, setFilterCity] = useContext(FilterCityContext);



  return (
    <Container maxWidth={900} padding={0}  >
    
    <Link href={`/board/order/${OrderData.orderId.slice(0,10)}`}
          style={Style.Wrapper}
          onClick={clickHendler}
     >
      {/* Top Section */}
      <div style={Style.TopSection}>
        <span style={{ textAlign: "center" }}>
          {" מחיר לשעת ניקיון"}
          <br />
          {OrderData?.orderPrice + " ש״ח" || na}
        </span>
      </div>

      {/* Bottom Section */}
      <div style={Style.BottomSection}>
        {/* Left Column */}
        <div style={Style.TextChildren}>
          <div style={Style.CardBotText}><CiPhone size={"1.3em"} /> {OrderData?.orderPhone || na}</div>
          <div style={Style.CardBotText}><IoMdPerson size={"1.3em"} /> {OrderData?.userName || na}</div>
          <div style={Style.CardBotText}><CiCalendarDate size={"1.3em"} /> {new Date(OrderData?.ResurveDate).toLocaleDateString('he-IL') || na}</div>
          <div style={Style.CardBotText}><IoLocation size={"1.3em"} /> {OrderData?.addres || na}</div>
        </div>

        {/* Right Column */}
        <div style={Style.TextChildren}>
          <div style={Style.CardBotText}><FaWarehouse size={"1.3em"} /> {OrderData?.ApartmentRoomsNumber || na}</div>
          <div style={Style.CardBotText}><FaRestroom size={"1.3em"} /> {OrderData?.NumberOfBaths || na}</div>
          <div style={Style.CardBotText}><MdOutlineBedroomChild size={"1.3em"} /> {OrderData?.ApartmentRoomsNumber || na}</div>
        </div>
      </div>
    </Link>
    </Container>
  );
};

export default Vcard;
