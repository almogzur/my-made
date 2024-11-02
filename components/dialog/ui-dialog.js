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



const Dialog = ({children,buttonStyle, buttonText, Icon}) =>
   {
     const [showModal, setShowModal] = useState(false)
      const handleModal = () => {  setShowModal(!showModal) }


      const Style = {
        helpBtn:{
           display:'flex',
           justifyContent:'space-evenly',
           alignItems:'center',
           width:"60px",
           height:"40px",   
           zIndex:2 ,
           backgroundColor: "#f4f4f5",
           color: '#fff',
           border: 'none',
           borderRadius: '5px',
           cursor: 'pointer',
           fontWeight: 'bold',
           margin: "5px",
           color:Colors.d,
  
        },
        BtnsWrapper:{
            display:"flex",
            position:'fixed',  
            left:"15px",
            top:"25px",
            zIndex:"2"
          }
      }



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
    < >
  
      <m.button
          transition={{duration:0.5, stiffness:50}}
          whileHover={{
             boxShadow: `4px 4px 2px  ${Colors.c} inset `,
             scale:1.1
           }}

          style={buttonStyle?? null}
          onClick={handleModal}
      >  
           { [Icon, <strong> {buttonText}</strong>]}
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
            background:"#fff"      
          },
          overlay: {
            position: 'fixed',
            top: "0.5em",
            left: "0.5em",
            right: "0.5em",
            bottom: "0.5em",
            borderRadius:"8px",
            overflowX:"hidden",
            background:Colors.d
              }
        }}
        overlayRef={(node) => overlayRef = node}
         contentRef={(node) => contentRef = node}        
        >
        <LazyMotion features={f}>
        <div style={Style.BtnsWrapper}>
          <m.button
              whileHover={{ background: Colors.d, color:"#fff" }}
               onClick={scroolDown}
               style={Style.helpBtn }
          >
            <FaArrowDown  size="30" />
          </m.button>
          
          <m.button
            whileHover={{ background: Colors.d, color:"#fff"}}
            onClick={ handleModal}
            style={{...Style.helpBtn 
              }}
          >
            <RiCloseLargeFill  size="30" />
          </m.button>
        
        </div>
        </LazyMotion>
        {children}

    

      </ReactModal>
    </>
  );
}

export default Dialog;
