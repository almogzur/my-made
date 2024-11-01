import React from 'react';
import { MdEdit } from 'react-icons/md';
import { FaRegClipboard } from 'react-icons/fa';
import Colors from '../../lib/colors';
import { useRouter } from 'next/router';
import { color } from 'framer-motion';


const Style = {
  wrapper: {
    padding: '30px',
    backgroundColor: '#FFF',


    margin: '0 auto',
    boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
  },
  headline: {
    fontSize: '2rem',
    fontWeight: 'bold',
    textAlign: 'center',
    color:Colors.c
 
  },
  subheadline:{
    textAlign:"center",
    fontSize:"8xp",
    color:Colors.c,
    marginBottom:"20px",
  },
  itemWrapper: {
    display: 'flex',
    flexDirection: 'column',
    gap: '15px',
    marginBottom: '20px',
  },
  item: {
    display: 'flex',
    justifyContent: 'space-between',
    borderBottom: '2px solid #c2b5a9',
    paddingBottom: '8px',
    
  },
  itemWide: {
    display: 'flex',
    flexDirection: 'column',
    paddingTop: '15px',
    marginBottom: '20px',
    borderBottom: '1px dotted #c2b5a9',

    
  },
  label: {
    color: Colors.d,
    fontWeight: 'bold',
  },
  infoText: {
    color: '#333',
    fontSize: '1rem',
    fontWeight: 'bold',

  },
  btnWrapper: {
    display: 'flex',
    gap: '10px',
    justifyContent: 'space-evenly',
  },
  btn: {
    display: 'flex',
    alignItems: 'center',
    gap: '5px',
    padding: '10px 20px',
    backgroundColor: Colors.d,
    color: '#fff',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
    fontSize: '1rem',
    fontWeight: 'bold',
  },
};

const ProfileDetails = ({ user, setEdit,  }) => {
  const router = useRouter()

  return (
    <div style={Style.wrapper}>
      <h3 style={Style.headline}>  נרשמתם בהצלחה </h3>
      <p style={Style.subheadline} > ניתן לראות הזמנות בלוח עבודות  </p>

      <div style={Style.itemWrapper}>
        <div style={Style.item}>
          <div style={Style.label}>שם</div>
          <h1 style={Style.infoText}>{user.BussniseName}</h1>
        </div>

        <div style={Style.item}>
          <div style={Style.label}>טלפון</div>
          <div style={Style.infoText}>{user.phone ?? "לא זמין"}</div>
        </div>

        <div style={Style.item}>
          <div style={Style.label}>מחיר לשעה</div>
          <div style={Style.infoText}>{user.price}</div>
        </div>

        <div style={Style.item}>
          <div style={Style.label}>זמין</div>
          <h1 style={Style.infoText}>{user.isVendor ? 'כן' : 'לא'}</h1>
        </div>
        
      </div>

      <div style={Style.itemWide}>
        <div style={Style.label}>תיאור</div>
        <div style={Style.infoText}>{user.description}</div>
      </div>

      <div style={Style.btnWrapper}>
        <button style={Style.btn} onClick={() => setEdit(true)}>
          <MdEdit size={"24px"} color={Colors.c} /> ערוך פרטים
        </button>

        {user?.isVendor && (
          <button style={Style.btn} onClick={() => router.push('/board')}>
            <FaRegClipboard size={"24px"} color={Colors.c} /> לוח עבודות
          </button>
        )}
      </div>
      
    </div>
  );
};



export default ProfileDetails;
