
import { useState } from "react";
import ReactModal from "react-modal";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {faXmark} from "@fortawesome/free-solid-svg-icons"


const Dialog = ({id,children,buttonText})=>{

    const [showModal,setShowModle]=useState(false)

   const handleModal= ()=> {
        setShowModle(!showModal);
      }

      
      return(
      <div className={`${id}-dialog-wrapper`} >
         <button 
           className={`${id}-btn`}
             onClick={handleModal}
            >
           {buttonText}
        </button>
        <ReactModal 
            isOpen={showModal}
            contentLabel="onRequestClose Example"
            onRequestClose={handleModal}
            className="Modal"
            overlayClassName="Overlay"
            >
              {children}
    
         <button  
         onClick={handleModal}
           className="vener-x-btn"
         >
          <FontAwesomeIcon icon={faXmark} />
        </button>

     
      </ReactModal>
    </div>
  );

}


export default Dialog