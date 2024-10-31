import React from 'react';
import { MdEdit } from 'react-icons/md';
import { FaRegClipboard } from 'react-icons/fa';
import Colors from '../../lib/colors';
import { useRouter } from 'next/router';


const styles = {
  wrapper: {
    padding: '30px',
    backgroundColor: '#FFF',

    fontFamily: "'Times New Roman', serif",

    margin: '0 auto',
    borderRadius: '8px',
    boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
  },
  headline: {
    fontSize: '2rem',
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: '20px',
  },
  itemWrapper: {
    display: 'flex',
    flexDirection: 'column',
    gap: '15px',
    marginBottom: '20px',
  },
  itemDisplay: {
    display: 'flex',
    justifyContent: 'space-between',
    borderBottom: '1px dotted #c2b5a9',
    paddingBottom: '8px',
  },
  itemDisplayWide: {
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
    <div style={styles.wrapper}>
      <h3 style={styles.headline}>נרשמתם בהצלחה</h3>

      <div style={styles.itemWrapper}>
        <div style={styles.itemDisplay}>
          <div style={styles.label}>שם</div>
          <h1 style={styles.infoText}>{user.BussniseName}</h1>
        </div>

        <div style={styles.itemDisplay}>
          <div style={styles.label}>טלפון</div>
          <div style={styles.infoText}>{user.phone ?? "לא זמין"}</div>
        </div>

        <div style={styles.itemDisplay}>
          <div style={styles.label}>מחיר לשעה</div>
          <div style={styles.infoText}>{user.price}</div>
        </div>

        <div style={styles.itemDisplay}>
          <div style={styles.label}>זמין</div>
          <h1 style={styles.infoText}>{user.isVendor ? 'כן' : 'לא'}</h1>
        </div>
        
      </div>

      <div style={styles.itemDisplayWide}>
        <div style={styles.label}>תיאור</div>
        <div style={styles.infoText}>{user.description}</div>
      </div>

      <div style={styles.btnWrapper}>
        <button style={styles.btn} onClick={() => setEdit(true)}>
          <MdEdit size={"24px"} color={Colors.c} /> ערוך פרטים
        </button>

        {user?.isVendor && (
          <button style={styles.btn} onClick={() => router.push('/board')}>
            <FaRegClipboard size={"24px"} color={Colors.c} /> לוח עבודות
          </button>
        )}
      </div>
    </div>
  );
};



export default ProfileDetails;
