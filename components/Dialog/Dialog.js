
import { useState } from "react";
import ReactModal from "react-modal";
import VenderForm from 'pages/vendor/VenderForm'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {faXmark} from "@fortawesome/free-solid-svg-icons"
const Dialog = ({id,text,children})=>{

    const [showModal,setShowModle]=useState(false)

   const handleModal= ()=> {
        setShowModle(!showModal);
      }
      
  
      return(
      <div>
      <button onClick={handleModal}>טופס הרשמה</button>
      <ReactModal 
         isOpen={showModal}
         contentLabel="onRequestClose Example"
         onRequestClose={handleModal}
         className="Modal"
         overlayClassName="Overlay"
      >
              {children}
     
        <button  onClick={handleModal}
          className="vener-x-btn"
        >
          <FontAwesomeIcon icon={faXmark} />
        </button>
      </ReactModal>
    </div>
  );

}


export default Dialog