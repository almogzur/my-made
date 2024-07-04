
import { useState } from "react";
import ReactModal from "react-modal";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {faXmark} from "@fortawesome/free-solid-svg-icons"
import {  motion } from "framer-motion";



///// change button naming for css

const Dialog = ({id,children,buttonText})=>{

    const [showModal,setShowModle]=useState(false)

   const handleModal= ()=> {
        setShowModle(!showModal);
      }

      
      return(
      <div className={`${id}-wrapper`} >
         <button 
           className={`${id}-btn`}
             onClick={handleModal}
            >
           {buttonText}
        </button>
        <ReactModal 
            ariaHideApp={false}
            isOpen={showModal}
            contentLabel="onRequestClose Example"
            onRequestClose={handleModal}
            className="Modal"
            overlayClassName="Overlay"
            
            >
              {children}
    
         <motion.button   
          whileHover={ {} }
           onClick={handleModal}
           style={{
             position:"absolute",
             top:"10px",
             right:"10px",
             borderRadius:"15px"
           }}
          
           
         >
          <FontAwesomeIcon size="2x" icon={faXmark} />
        </motion.button>

     
      </ReactModal>
    </div>
  );

}


export default Dialog