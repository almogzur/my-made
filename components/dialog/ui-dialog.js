import { useContext, useEffect, useState , useRef } from "react";
import { RiCloseLargeFill } from "react-icons/ri";
import { FaArrowDown } from "react-icons/fa6";

import { m, LazyMotion, color } from "framer-motion";
import ReactModal from "react-modal";
import Colors from "../../lib/colors";
import f from '../../lib/features'
import { Button, Flex } from "@chakra-ui/react";


  // outside the  function scope prevent react Memo
  let overlayRef = null;
  let contentRef = null;  



const Dialog = ({children,buttonStyle, buttonText, Icon}) => {

     const [showModal, setShowModal] = useState(false)
     const handleModal = () => {  setShowModal(!showModal) }
     const scroolDown = ()=>{
    const options = {top:700,behavior:"smooth"}
    
    if(contentRef){
        contentRef.scroll(options)
    }
     }

     const overlay ={
          position: "absolute",
          top: "1em",
          left: "5px",
          right: "5px",
          bottom: '1em',
          borderRadius: "2px",
          overflowX:"hidden",
     }
     const content ={
          position: 'fixed',
           top: "1em",
           left: "1em",
           right: "1em",
           bottom: "10px",
           borderRadius:"8px",
           overflowX:"hidden",
           background:'#e4e4e7'
       
     }
  
  return (
    <>
  
      <Button  variant={"subtle"}  style={{...buttonStyle}} onClick={handleModal}>  {Icon}{buttonText} </Button>
      
      <ReactModal
         ariaHideApp={false}
         isOpen={showModal}
         onRequestClose={handleModal}
         style={{content: content ,overlay: overlay }}
         overlayRef={(node) => overlayRef = node}
         contentRef={(node) => contentRef = node}        
        >
      
        <Flex justifyContent={"flex-end"} >

          <Button colorPalette={"blue"} variant={"subtle"} onClick={scroolDown} ml={1} p={0} >
            <FaArrowDown   />
          </Button>
          
          <Button onClick={ handleModal} m={0} p={0}  colorPalette={"blue"} variant={"subtle"} >
            <RiCloseLargeFill   />
          </Button>

        </Flex>
        {children}
      </ReactModal>
    </>
  );
}

export default Dialog;
