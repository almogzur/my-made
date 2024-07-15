import React, { useState } from 'react';
import { LazyMotion, m } from "framer-motion";
import Colors from '../../lib/colors';
import f from "../../lib/features";

const InfoDisplay = ({ age, about, phone, setShowInfo, setPerentOpenModle }) => {
  const [visibleButtonIndex, setVisibleButtonIndex] = useState(null);

  const userInfo = [
    ["גיל", age],
    ["טלפון", phone],
    ["עלי", about],
  ];

  const handleDivClick = (index) => {
    setVisibleButtonIndex(visibleButtonIndex === index ? null : index);
  };

  return (
    <LazyMotion features={f}>
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          padding: '10px',
        }}
      >
        {userInfo.map(([label, value], index) => (
          <m.div
            key={index}
            style={{
              width: '100%',
              borderRadius: "1px",
              padding: "5px",
              margin: "5px 0",
              boxShadow: `2px 1px 3px 1px ${Colors.c}`,
              position: 'relative',
              cursor: 'pointer',
            }}
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.5 }}
            onClick={() => handleDivClick(index)}
          >
            <strong>{label}: {value}</strong>
            {visibleButtonIndex === index && (
              <m.button
                style={{
                  height: "30px",
                  width: '100px',
                  border: "none",
                  borderRadius: "2px",
                  background: `radial-gradient(circle, ${Colors.c} 60%, ${Colors.b} 100%)`,
                  boxShadow: `4px 4px 2px ${Colors.c}`,
                  color: "#fff",
                  fontSize: "16px",
                  cursor: "pointer",
                  marginTop: "5px",
                  alignSelf: 'start',
                  position: 'absolute',
                  top: '50%',
                  left: '50%',
                  transform: 'translate(-50%, -50%)',
                  opacity:1
                }}
                whileHover={{ scale: 1.1 }}
                transition={{ duration: 0.5 }}
                onClick={(e) => {
                  e.stopPropagation();
                  setShowInfo(false);
                  setPerentOpenModle(true);
                }}
              >
                <strong>ערוך פרטים</strong>
              </m.button>
            )}
          </m.div>
        ))}
      </div>
    </LazyMotion>
  );
};

export default InfoDisplay;
