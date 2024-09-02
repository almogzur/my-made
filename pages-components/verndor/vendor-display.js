import { useSession } from 'next-auth/react';
import {useContext, useEffect } from 'react';
import { useRouter } from 'next/router';
import Colors from '../../lib/colors';
import MongoSpinner from '../../components/mongo-spinner/mongo-spinner';


const STATE_KEY = "Vendor";


const VendorDisplay = ({ 
                BussniseName, 
                price, 
                description,
                isVendor,
                setEdit,
                phone,
                }) =>
     {
  const { data: session, status, update } = useSession();

  
  const headlineStyle = { textAlign: "center", color: Colors.primary, fontSize: '24px', marginBottom: '20px' };

  useEffect(() => {
    // Add any required effect here
  }, []);

  if (status === 'loading') {
    return <MongoSpinner />;
  }

  const displayStyle = {
    padding: "5px",
    borderRadius: "5px",
    marginBottom: "10 x",
    boxShadow: `0 2px 4px ${Colors.c}`,
  };

  return (
    <div style={{ marginBottom: "0px", padding: '10px', }}>
      <h2 style={headlineStyle}>{`שלום ${session?.user?.name}`}</h2>
      <h3 style={headlineStyle}>{ `נרשמת כנותן שירות להלן הפרטים `}</h3>

      <div style={displayStyle}>
        <div style={{ color: Colors.c }}>שם</div>
        <div>{BussniseName}</div>
      </div>
      <div style={displayStyle}>
        <div style={{ color: Colors.c }}>טלפון</div>
        <div>{phone}</div>
      </div>
      <div style={displayStyle}>
        <div style={{ color: Colors.c }}>מחיר</div>
        <div>{price}</div>
      </div>
      <div style={displayStyle}>
        <div style={{ color: Colors.c }}>תיאור</div>
        <div>{description}</div>
      </div>
      
      <div style={displayStyle}>
        <div style={{ color: Colors.c }}> זמין (ניתן לערוך בדף הפרופיל)</div>
        <div>{isVendor ? 'כן' : 'לא'}</div>
      </div>


      <div style={{ display: "flex", justifyContent: "center", marginTop: "15px" }}>
        <button
          type="button"
          style={{
            height: "60px",
            width: '150px',
            border: `1px solid ${Colors.border}`,
            borderRadius: "3px",
            background: Colors.buttonBackground,
            fontSize: "20px",
            cursor: "pointer",
            textAlign: "center",
            color: Colors.buttonText,
            boxShadow: `3px 3px 3px 3px ${Colors.c}`,
            transition: 'box-shadow 0.3s ease-in-out',
          }}
          onClick={() => {setEdit(true)}}
          onMouseOver={(e) => e.target.style.boxShadow = `0px 0px 0px 0px ${Colors.a}` }
          onMouseOut={(e) => e.target.style.boxShadow =  `0px 4px 8px ${Colors.c}`}
        >
          ערוך
        </button>
      </div>
    </div>
  );
};

export default VendorDisplay;
