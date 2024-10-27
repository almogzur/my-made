import { useSession } from 'next-auth/react';
import {useContext, useEffect } from 'react';
import { useRouter } from 'next/navigation'

import Colors from '../../lib/colors';
import MongoSpinner from '../../components/mongo-spinner/mongo-spinner';
import AppHeader from '../../components/app-head/app-head';
import CostumeLink from '../../components/costume-link/costume-link'
import { FaRegClipboard } from "react-icons/fa";
import { MdEdit } from "react-icons/md";

import useUser from '../../lib/hooks/useUser';


const VendorDisplay = ({ 
                BussniseName, 
                price, 
                description,
                isVendor,
                setEdit,
                phone,
                }) =>
     {
  const router = useRouter()
  const { data: session, status, update } = useSession();
  const { user , isLoading , isError } = useUser(session?.user?.email)



  const Style = {
   headline: { 
       textAlign: "center",
       fontSize: '24px',
       marginBottom: '20px',
   },
   wrapper:{ 
    marginBottom: "0px",
     display:'flex',
     flexWrap:"wrap",
     flexDirection:"row",
     justifyContent:"space-around",

   },
   div:{
    padding: "5px",
    borderRadius: "5px",
    marginBottom: "10 x",
    boxShadow: `0 2px 4px ${Colors.d}`,
    margin:"5px",
    height:"70px",
    width: '150px',
    display:'flex',
    flexDirection:'column',
    justifyContent:'space-evenly',
    overflow:"clip"

   },
   buttonWrsapper:{ 
       display: "flex",
       justifyContent: "center",
       marginTop: "15px",
   },
   button:{
      height: "70px",
      width: '150px',
      borderRadius: "5px",
      border:"none",
      boxShadow: `0 2px 4px ${Colors.d}`,
      background:"none",
      fontSize: "20px",
      cursor: "pointer",
      
      display:'flex',
      flexDirection:'column',
      alignItems:'center',

      
     
      color: Colors.d,

   }
}

  return (
    <>   

   <AppHeader/>
   <h3 style={Style.headline}>{ ` פרטים `}</h3>
    <div style={Style.wrapper}>

      <div style={Style.div}>
        <div style={{ color: Colors.d}}>שם</div>
        <div>{BussniseName}</div>
      </div>
      <div style={Style.div}>
        <div style={{ color: Colors.d }}>טלפון</div>
        <div>{phone}</div>
      </div>
      <div style={Style.div}>
        <div style={{ color: Colors.d }}>מחיר לשעת </div>
        <div>{price}</div>
      </div>
      <div style={Style.div}>
        <div style={{ color: Colors.d }}> זמין </div>
        <div>{isVendor ? 'כן' : 'לא'}</div>
      </div>
      <div style={{...Style.div, width:"100%"}}>
        <div style={{ color: Colors.c }}>תיאור</div>
        <div>{description}</div>
      </div>
      
  
  
    </div>
   
    <div 
         style={Style.buttonWrsapper}
         >
         <button
          type="button"
          style={Style.button}
          onClick={() => {setEdit(true)}}
        >
          <MdEdit  size={"40px"} color={Colors.d} />
     

          ערוך פרטים
        </button>

        { 
            user?.Vendor?.isVendor ? 
    
             <button
                style={{...Style.button  }}
                onClick={() => router.push('/board')}
             >
                   <FaRegClipboard   size={"40px"} color={Colors.d} />
            
                     לוח עבודות
             </button>
             :
             null

          } 
    </div>


    </>

  );
};

export default VendorDisplay;
