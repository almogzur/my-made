import { useSession } from 'next-auth/react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import Colors from '../../../lib/colors';
import { CiCalendarDate, CiPhone } from "react-icons/ci";
import { FaWarehouse, FaRestroom } from "react-icons/fa";
import { PiBathtubDuotone } from "react-icons/pi";
import { IoMdPerson } from "react-icons/io";
import { FaMoneyBill1Wave } from "react-icons/fa6";
import { IoLocation } from "react-icons/io5";
import { MdOutlineBedroomChild } from "react-icons/md";

const Style = {
  Wrapper: {
    width: "100%",  // Full width for vertical orientation
    height: "auto",  // Dynamic height based on content
    boxShadow: `0px 0px 0px 1px ${Colors.c}`,
    marginTop: "10px",
    borderRadius: "5px",
    display: 'flex',
    flexDirection: 'column',  // Vertical layout
    cursor: "pointer",
    textDecoration: "none",
  },
  TopSection: {
    background: Colors.a,  // Background color for the top section
    padding: '15px',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    color: Colors.text,
    borderBottom: `1px solid ${Colors.c}`,
  },
  BottomSection: {
    background: Colors.c,  // Background color for the bottom section
    padding: '15px',
    display: 'flex',
    flexDirection: 'row',  // Row layout for text children, like hcard
    justifyContent: 'space-between',
    color: Colors.text,
  },
  TextChildren: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    rowGap: '10px',  // Spacing between text items
  },
  CardBotText: {
    display: 'flex',
    alignItems: 'center',
    margin: '5px 0',
    fontSize: '1rem',
  }
};

const Vcard = ({ OrderData }) => {
  const router = useRouter();
  const { data: session, status } = useSession();
  const na = "N/A";

  if (status === 'loading') {
    return <h1 style={{ textAlign: 'center' }}>Loading...</h1>;
  }

  return (
    <Link href={""} style={Style.Wrapper}>
      {/* Top Section */}
      <div style={Style.TopSection}>
        <FaMoneyBill1Wave color={Colors.d} size={"3em"} />
        <span style={{ textAlign: "center" }}>
          {" מחיר לשעת ניקיון"}
          <br />
          {OrderData?.orderPrice || na}
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
  );
};

export default Vcard;
