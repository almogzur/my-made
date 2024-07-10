import React, { useContext } from 'react';
import { LazyMotion, m } from "framer-motion";
import Colors from '@/lib/colors';


const loadFeatures = () =>
  import("@/lib/features.js").then(res => res.default);

const InfoDisplay = ({ age, about, phone ,setShowInfo,setPerentOpenModle,perentOpenModle }) => {

  const userInfo = [
    ["גיל", age],
    ["טלפון", phone],
    ["עלי", about],

  ];

  return (
    <LazyMotion features={loadFeatures}>
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          padding: '20px',
        }}
      >
        {userInfo.map(([label, value], index) => (
          <m.div
            key={index}
            style={{
              width: '100%',
              maxWidth: '400px',
              border: `1px solid ${Colors.b}`,
              borderRadius: "6px",
              padding: "10px",
              margin: "10px 0",
              boxShadow: `2px 1px 1px ${Colors.c}`,
            }}
            animate={{ opacity: [0, 1] }}
            transition={{ duration: 1 }}
            whileHover={{scale:  1.1 }}    
          >
            <strong>{label}: {value}</strong>
          </m.div>
        ))}
        <m.button
          style={{
            height: "40px",
            width: '100px',
            border: "none",
            borderRadius: "8px",
            backgroundColor: Colors.c,
            color: "#fff",
            boxShadow: `2px 2px 5px ${Colors.d}`,
            fontSize: "16px",
            cursor: "pointer",
            marginTop: "10px",
            alignSelf: 'center',
          }}
          whileHover={{scale:1.1 ,  duration:1}} 
          transition={{ duration: 1 }}
          onClick={
            ()=>{
            setShowInfo(false);
            setPerentOpenModle(true)
            
            }

          }
          >
           ערוך פרטים  
        </m.button>
      </div>
    </LazyMotion>
  );
};

export default InfoDisplay;
