import { useContext, useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes } from "@fortawesome/free-solid-svg-icons";
import { m, LazyMotion, color } from "framer-motion";
import ReactModal from "react-modal";
import Colors from "../../lib/colors";
import f from '../../lib/features'

const Dialog = ({
  children,
  buttonText,
  CloseDialogButtonStyle,
  wrapperStyle,
  perentOpenModle,
  perntHendler,  
}) => {
  const [showModal, setShowModal] = useState(false);

  const handleModal = () => {
     console.log(" children click");
     
          setShowModal(!showModal); 
  }
  
  return (
    <div
      style={wrapperStyle ? wrapperStyle : null}
    >
      { /** Closed*/}
  
  {
    perentOpenModle? null:
      <m.button
          transition={{duration:0.5, stiffness:50}}
          whileHover={{
             boxShadow: `4px 4px 2px  ${Colors.c} inset `,
             scale:1.1
           }}
          whileTap={{
             boxShadow: `1px 1px 1px  ${Colors.c} inset `,
           }}
          style={CloseDialogButtonStyle ? CloseDialogButtonStyle : null}
          onClick={handleModal}
      >
        <strong>{buttonText}</strong>
      </m.button>
      }
      {/** Open */}
      <ReactModal
        ariaHideApp={false}
        isOpen={perentOpenModle ? perentOpenModle : showModal }
        onRequestClose={perentOpenModle ? perentOpenModle : showModal}
        style={{
          content: {
            position: "absolute",
            top: "3px",
            left: "3px",
            right: "3px",
            bottom: '3px',
            borderRadius: "2px",
            overflowX:"hidden",
            background:Colors.b,
            color:Colors.d,
          

          },
          overlay: {
            position: 'fixed',
            top: "20px",
            left: "5px",
            right: "5px",
            bottom: "60px",
            borderRadius:"8px",
            overflowX:"hidden",
            background:Colors.d
          }
        }}
      >
        {children}
        <LazyMotion features={f}>
          <m.button
            whileHover={{ background: Colors.d }}
            onClick={perentOpenModle? perntHendler: handleModal}
            style={{
              position: "absolute",
              top: "25px",
              left: "25px",
              borderRadius: "5px"
            }}
          >
            <FontAwesomeIcon size="3x" icon={faTimes} />
          </m.button>
        </LazyMotion>
      </ReactModal>

    </div>
  );
}

export default Dialog;
