import { useContext, useEffect, useState , useRef } from "react";
import { RiCloseLargeFill } from "react-icons/ri";
import { FaArrowDown } from "react-icons/fa6";

import { m, LazyMotion, color } from "framer-motion";
import ReactModal from "react-modal";
import Colors from "../../lib/colors";
import f from '../../lib/features'


  // outside the  function scope prevent react Memo
  let overlayRef = null;
  let contentRef = null;  

const Dialog = ({
  children,
  CloseDialogButtonStyle,
  wrapperStyle, 
  buttonText,
  Icon
}) => {
  const [showModal, setShowModal] = useState(false);
  const handleModal = () => {  setShowModal(!showModal); }
  const scroolDown = ()=>{


    const options = {
          top:600,
          behavior:"smooth"
        }
    
    if(contentRef){
      contentRef.scroll(options)
    }


  }
  
  return (
    <div
      style={wrapperStyle ? wrapperStyle : null}
    >
  
      <m.button
          transition={{duration:0.5, stiffness:50}}
          whileHover={{
             boxShadow: `4px 4px 2px  ${Colors.c} inset `,
             scale:1.1
           }}

          style={CloseDialogButtonStyle ? CloseDialogButtonStyle : null}
          onClick={handleModal}
      >  
           {   Icon? Icon: <strong> {buttonText}</strong>}
      </m.button>
      

      <ReactModal
        ariaHideApp={false}
        isOpen={showModal}
        onRequestClose={handleModal}
        style={{
          content: {
            position: "absolute",
            top: "1em",
            left: "5px",
            right: "5px",
            bottom: '1em',
            borderRadius: "2px",
            overflowX:"hidden",
            background:` linear-gradient(320deg, ${Colors.c} 11%, #fff 100%)`
          },
          overlay: {
            position: 'fixed',
            top: "3em",
            left: "0.5em",
            right: "0.5em",
            bottom: "60px",
            borderRadius:"8px",
            overflowX:"hidden",
            background:Colors.c        
              }
        }}
        overlayRef={(node) => overlayRef = node}
        contentRef={(node) => contentRef = node}        
        >
    
        {children}
        <LazyMotion features={f}>
        
          <m.button
            whileHover={{ background: Colors.d, color:Colors.text }}
            onClick={ handleModal}
            style={{
              position: "absolute",
              top: "15px",
              left: "15px",
              background:Colors.a,
              color:Colors.d,
              width:"40px",
              height:"40px",
              borderRadius:"5px",
              display:'flex',
              justifyContent:'center',
              alignItems:'center',
              alignContent:'center', 
              zIndex:2    
            }}
          >
          <RiCloseLargeFill  size="x2" />
          </m.button>
        
        <m.button
            whileHover={{ background: Colors.d, color:Colors.text }}
            onClick={scroolDown}
            style={{
              position: "absolute",
              top: "15px",
              left: "70px",
              background:Colors.a,
              color:Colors.d,
              width:"40px",
              height:"40px",
              borderRadius:"5px",
              display:'flex',
              justifyContent:'center',
              alignItems:'center',
              alignContent:'center',     
              zIndex:2    

            }}
          >
          <FaArrowDown  size="x2" />
        </m.button>
        </LazyMotion>
      </ReactModal>
    </div>
  );
}

export default Dialog;
